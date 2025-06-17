import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { Payment, Prisma, PrismaClient } from '@repo/database';
import { PaymentCreateInput, PaymentUpdateInput } from '@repo/types';

@injectable()
export class PaymentRepository extends BaseRepository<
  Payment,
  Prisma.PaymentDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.payment);
  }

  /**
   * Create payment record
   */
  async createPayment(data: PaymentCreateInput): Promise<Payment> {
    return this.create({
      orderId: data.orderId,
      transactionId: data.transactionId,
      amount: data.amount,
      currency: data.currency || 'USD',
      status: data.status || 'PENDING',
      provider: data.provider || 'stripe',
      metadata: data.metadata || {},
    });
  }

  /**
   * Update payment status and metadata
   */
  async updatePayment(
    id: string,
    data: PaymentUpdateInput
  ): Promise<Payment | null> {
    return this.update(id, {
      ...(data.status && { status: data.status }),
      ...(data.confirmedAt && { confirmedAt: data.confirmedAt }),
      ...(data.metadata && { metadata: data.metadata }),
    });
  }

  /**
   * Find payment by transaction ID
   */
  async findByTransactionId(transactionId: string): Promise<Payment | null> {
    return this.findFirst({
      where: { transactionId },
      include: {
        order: {
          include: {
            OrderItem: true,
          },
        },
      },
    });
  }

  /**
   * Find payments by order ID
   */
  async findByOrderId(orderId: string): Promise<Payment[]> {
    return this.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
      include: {
        order: true,
      },
    });
  }

  /**
   * Find payments by status
   */
  async findByStatus(
    status: Prisma.PaymentWhereInput['status']
  ): Promise<Payment[]> {
    return this.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
      include: {
        order: true,
      },
    });
  }

  /**
   * Find pending payments older than specified time
   */
  async findStalePayments(olderThanHours: number = 24): Promise<Payment[]> {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - olderThanHours);

    return this.findMany({
      where: {
        status: 'PENDING',
        createdAt: {
          lt: cutoffDate,
        },
      },
      include: {
        order: true,
      },
    });
  }

  /**
   * Get payment statistics for date range
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
    const stats = await this.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    const statusCounts = await this.prisma.payment.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const statusMap = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count.id;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalAmount: stats._sum.amount || 0,
      totalPayments: stats._count.id || 0,
      successfulPayments: statusMap.SUCCESS || 0,
      failedPayments: statusMap.FAILED || 0,
      pendingPayments: statusMap.PENDING || 0,
    };
  }

  /**
   * Mark payment as confirmed
   */
  async confirmPayment(transactionId: string): Promise<Payment | null> {
    return this.updatePayment(transactionId, {
      status: 'SUCCESS',
      confirmedAt: new Date(),
    });
  }

  /**
   * Mark payment as failed
   */
  async failPayment(
    transactionId: string,
    reason?: string
  ): Promise<Payment | null> {
    return this.updatePayment(transactionId, {
      status: 'FAILED',
      metadata: { failureReason: reason },
    });
  }

  /**
   * Mark payment as refunded
   */
  async refundPayment(
    transactionId: string,
    refundAmount?: number
  ): Promise<Payment | null> {
    return this.updatePayment(transactionId, {
      status: 'REFUNDED',
      metadata: { refundAmount, refundedAt: new Date() },
    });
  }
}
