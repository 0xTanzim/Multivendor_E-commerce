import { injectable } from '@repo/core';
import {
  IPaymentProvider,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentMethodRequest,
  PaymentMethodResponse,
  RefundRequest,
  RefundResponse,
  WebhookEvent,
} from '@repo/types';
import Stripe from 'stripe';
import type { StripeConfig } from '../../types/config';
import {
  PaymentProviderError,
  WebhookValidationError,
} from '../../types/errors';
// Using enum values directly since we can't import from @repo/database
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

@injectable()
export class StripeProvider implements IPaymentProvider {
  private stripe: Stripe;
  private config: StripeConfig;

  constructor(config: StripeConfig) {
    this.config = config;
    this.stripe = new Stripe(config.secretKey, {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(
    request: PaymentIntentRequest
  ): Promise<PaymentIntentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(request.amount * 100), // Convert to cents
        currency: request.currency,
        customer: request.customerId,
        metadata: {
          orderId: request.orderId,
          ...request.metadata,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret!,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to create payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        500
      );
    }
  }

  async confirmPayment(
    request: PaymentConfirmRequest
  ): Promise<PaymentConfirmResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(
        request.paymentIntentId,
        request.paymentMethodId
          ? { payment_method: request.paymentMethodId }
          : {}
      );

      return {
        id: paymentIntent.id,
        status: this.mapStripeStatusToPaymentStatus(paymentIntent.status),
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        confirmedAt:
          paymentIntent.status === 'succeeded' ? new Date() : undefined,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to confirm payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        402
      );
    }
  }

  async refundPayment(request: RefundRequest): Promise<RefundResponse> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: request.paymentId,
        amount: request.amount ? Math.round(request.amount * 100) : undefined,
        reason: request.reason as Stripe.RefundCreateParams.Reason,
        metadata: request.metadata,
      });

      return {
        id: refund.id,
        status: refund.status || 'unknown',
        amount: refund.amount / 100,
        reason: refund.reason || undefined,
        createdAt: new Date(refund.created * 1000),
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to refund payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        500
      );
    }
  }

  async createPaymentMethod(
    request: PaymentMethodRequest
  ): Promise<PaymentMethodResponse> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: request.type as Stripe.PaymentMethodCreateParams.Type,
        customer: request.customerId,
        metadata: request.metadata,
      });

      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        last4: paymentMethod.card?.last4,
        brand: paymentMethod.card?.brand,
        expiryMonth: paymentMethod.card?.exp_month,
        expiryYear: paymentMethod.card?.exp_year,
        customerId: paymentMethod.customer as string,
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to create payment method: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        500
      );
    }
  }

  async retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<PaymentIntentResponse> {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret!,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to retrieve payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        404
      );
    }
  }

  async retrievePayment(paymentId: string): Promise<PaymentConfirmResponse> {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentId);

      return {
        id: paymentIntent.id,
        status: this.mapStripeStatusToPaymentStatus(paymentIntent.status),
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        confirmedAt:
          paymentIntent.status === 'succeeded' ? new Date() : undefined,
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      throw new PaymentProviderError(
        `Failed to retrieve payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'stripe',
        404
      );
    }
  }

  async handleWebhook(
    payload: string,
    signature: string
  ): Promise<WebhookEvent> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.config.webhookSecret
      );

      return {
        id: event.id,
        type: event.type,
        data: {
          object: event.data.object,
        },
        created: event.created,
        livemode: event.livemode,
      };
    } catch (error) {
      throw new WebhookValidationError(
        `Invalid webhook signature: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  validateWebhookSignature(payload: string, signature: string): boolean {
    try {
      this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.config.webhookSecret
      );
      return true;
    } catch {
      return false;
    }
  }

  private mapStripeStatusToPaymentStatus(stripeStatus: string): PaymentStatus {
    switch (stripeStatus) {
      case 'succeeded':
        return PaymentStatus.SUCCESS;
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'requires_action':
      case 'processing':
        return PaymentStatus.PENDING;
      case 'canceled':
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }
}
