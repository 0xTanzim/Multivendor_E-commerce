import { PaymentRepository } from '@repo/backend-repository';
import { BadRequestError, NotFoundError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { Payment } from '@repo/database';
import {
  PaymentCreateInput,
  PaymentUpdateInput,
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  RefundRequest,
  RefundResponse,
} from '@repo/types';
import { PaymentService as PaymentGatewayService } from '@repo/payment-gateway';

@injectable()
export class PaymentService extends BaseService<Payment, PaymentRepository> {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentGatewayService: PaymentGatewayService
  ) {
    super(paymentRepository);
  }

  /**
   * Create payment intent and store payment record
   */
  async createPaymentIntent(
    request: PaymentIntentRequest & {
      provider?: string;
    }
  ): Promise<{
    paymentIntent: PaymentIntentResponse;
    paymentRecord: Payment;
  }> {
    try {
      // Create payment intent with provider
      const paymentIntent =
        await this.paymentGatewayService.createPaymentIntent(
          request,
          request.provider || 'stripe'
        );

      // Store payment record in database
      const paymentRecord = await this.paymentRepository.createPayment({
        orderId: request.orderId,
        transactionId: paymentIntent.id,
        amount: request.amount,
        currency: request.currency,
        status: 'PENDING',
        provider: request.provider || 'stripe',
        metadata: {
          clientSecret: paymentIntent.clientSecret,
          ...request.metadata,
        },
      });

      return {
        paymentIntent,
        paymentRecord,
      };
    } catch (error) {
      this.handlePrismaError(error, 'createPaymentIntent');
    }
  }

  /**
   * Confirm payment and update database
   */
  async confirmPayment(
    request: PaymentConfirmRequest & {
      provider?: string;
    }
  ): Promise<{
    paymentConfirm: PaymentConfirmResponse;
    paymentRecord: Payment | null;
  }> {
    try {
      // Confirm payment with provider
      const paymentConfirm = await this.paymentGatewayService.confirmPayment(
        request,
        request.provider || 'stripe'
      );

      // Update payment record in database
      const paymentRecord = await this.paymentRepository.findByTransactionId(
        request.paymentIntentId
      );

      if (!paymentRecord) {
        throw new NotFoundError(
          `Payment record not found for transaction: ${request.paymentIntentId}`
        );
      }

      // Update payment status based on confirmation result
      const updatedPayment = await this.paymentRepository.updatePayment(
        paymentRecord.id,
        {
          status: paymentConfirm.status,
          confirmedAt: paymentConfirm.confirmedAt,
          metadata: {
            ...((paymentRecord.metadata as Record<string, any>) || {}),
            ...paymentConfirm.metadata,
          },
        }
      );

      return {
        paymentConfirm,
        paymentRecord: updatedPayment,
      };
    } catch (error) {
      this.handlePrismaError(error, 'confirmPayment');
    }
  }

  /**
   * Process refund for payment
   */
  async refundPayment(
    request: RefundRequest & {
      provider?: string;
    }
  ): Promise<{
    refundResponse: RefundResponse;
    paymentRecord: Payment | null;
  }> {
    try {
      // Find payment record
      const paymentRecord = await this.paymentRepository.findByTransactionId(
        request.paymentId
      );

      if (!paymentRecord) {
        throw new NotFoundError(
          `Payment record not found for transaction: ${request.paymentId}`
        );
      }

      if (paymentRecord.status !== 'SUCCESS') {
        throw new BadRequestError('Can only refund successful payments');
      }

      // Process refund with provider
      const refundResponse = await this.paymentGatewayService.refundPayment(
        request,
        request.provider || paymentRecord.provider
      );

      // Update payment record
      const updatedPayment = await this.paymentRepository.updatePayment(
        paymentRecord.id,
        {
          status: 'REFUNDED',
          metadata: {
            ...((paymentRecord.metadata as Record<string, any>) || {}),
            refund: {
              id: refundResponse.id,
              amount: refundResponse.amount,
              reason: refundResponse.reason,
              createdAt: refundResponse.createdAt,
            },
          },
        }
      );

      return {
        refundResponse,
        paymentRecord: updatedPayment,
      };
    } catch (error) {
      this.handlePrismaError(error, 'refundPayment');
    }
  }

  /**
   * Get payment by transaction ID
   */
  async getPaymentByTransactionId(
    transactionId: string
  ): Promise<Payment | null> {
    try {
      return await this.paymentRepository.findByTransactionId(transactionId);
    } catch (error) {
      this.handlePrismaError(error, 'getPaymentByTransactionId');
    }
  }

  /**
   * Get payments for order
   */
  async getPaymentsByOrderId(orderId: string): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findByOrderId(orderId);
    } catch (error) {
      this.handlePrismaError(error, 'getPaymentsByOrderId');
    }
  }

  /**
   * Get payments by status
   */
  async getPaymentsByStatus(
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'CANCELLED'
  ): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findByStatus(status);
    } catch (error) {
      this.handlePrismaError(error, 'getPaymentsByStatus');
    }
  }

  /**
   * Handle payment webhook
   */
  async handleWebhook(
    payload: string,
    signature: string,
    provider: string = 'stripe'
  ): Promise<Payment | null> {
    try {
      // Validate and parse webhook
      const webhookEvent = await this.paymentGatewayService.handleWebhook(
        payload,
        signature,
        provider
      );

      // Handle different webhook event types
      switch (webhookEvent.type) {
        case 'payment_intent.succeeded':
          return this.handlePaymentSucceeded(webhookEvent.data.object);

        case 'payment_intent.payment_failed':
          return this.handlePaymentFailed(webhookEvent.data.object);

        case 'payment_intent.canceled':
          return this.handlePaymentCanceled(webhookEvent.data.object);

        default:
          console.log(`Unhandled webhook event type: ${webhookEvent.type}`);
          return null;
      }
    } catch (error) {
      this.handlePrismaError(error, 'handleWebhook');
    }
  }

  /**
   * Handle successful payment webhook
   */
  private async handlePaymentSucceeded(
    paymentIntentData: any
  ): Promise<Payment | null> {
    const paymentRecord = await this.paymentRepository.findByTransactionId(
      paymentIntentData.id
    );

    if (paymentRecord) {
      return await this.paymentRepository.updatePayment(paymentRecord.id, {
        status: 'SUCCESS',
        confirmedAt: new Date(),
        metadata: {
          ...((paymentRecord.metadata as Record<string, any>) || {}),
          webhookData: paymentIntentData,
        },
      });
    }

    return null;
  }

  /**
   * Handle failed payment webhook
   */
  private async handlePaymentFailed(
    paymentIntentData: any
  ): Promise<Payment | null> {
    const paymentRecord = await this.paymentRepository.findByTransactionId(
      paymentIntentData.id
    );

    if (paymentRecord) {
      return await this.paymentRepository.updatePayment(paymentRecord.id, {
        status: 'FAILED',
        metadata: {
          ...((paymentRecord.metadata as Record<string, any>) || {}),
          failureReason: paymentIntentData.last_payment_error?.message,
          webhookData: paymentIntentData,
        },
      });
    }

    return null;
  }

  /**
   * Handle canceled payment webhook
   */
  private async handlePaymentCanceled(
    paymentIntentData: any
  ): Promise<Payment | null> {
    const paymentRecord = await this.paymentRepository.findByTransactionId(
      paymentIntentData.id
    );

    if (paymentRecord) {
      return await this.paymentRepository.updatePayment(paymentRecord.id, {
        status: 'CANCELLED',
        metadata: {
          ...((paymentRecord.metadata as Record<string, any>) || {}),
          webhookData: paymentIntentData,
        },
      });
    }

    return null;
  }

  /**
   * Get payment statistics
   */
  async getPaymentStats(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalAmount: number;
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
  }> {
    try {
      return await this.paymentRepository.getPaymentStats(startDate, endDate);
    } catch (error) {
      this.handlePrismaError(error, 'getPaymentStats');
    }
  }

  /**
   * Clean up stale pending payments
   */
  async cleanupStalePayments(olderThanHours: number = 24): Promise<number> {
    try {
      const stalePayments =
        await this.paymentRepository.findStalePayments(olderThanHours);

      let updatedCount = 0;
      for (const payment of stalePayments) {
        await this.paymentRepository.updatePayment(payment.id, {
          status: 'CANCELLED',
          metadata: {
            ...((payment.metadata as Record<string, any>) || {}),
            canceledReason: 'Stale payment timeout',
            canceledAt: new Date(),
          },
        });
        updatedCount++;
      }

      return updatedCount;
    } catch (error) {
      this.handlePrismaError(error, 'cleanupStalePayments');
    }
  }
}
