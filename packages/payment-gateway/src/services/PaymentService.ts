import { injectable, inject } from '@repo/core';
import {
  IPaymentProvider,
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  RefundRequest,
  RefundResponse,
  PaymentMethodRequest,
  PaymentMethodResponse,
  WebhookEvent,
} from '@repo/types';
import { PaymentGatewayError, PaymentValidationError } from '../types/errors';
import { StripeProvider } from '../providers/stripe/StripeProvider';
import { StripeConfig } from '../types/config';

/**
 * PaymentService - Central payment orchestration service
 * Follows SRP by handling payment operations through providers
 */
@injectable()
export class PaymentService {
  private providers: Map<string, IPaymentProvider> = new Map();
  private defaultProvider: string = 'stripe';

  constructor() {
    // Initialize providers - could be configurable
    this.initializeProviders();
  }

  private initializeProviders(): void {
    // Initialize Stripe provider with config
    const stripeConfig: StripeConfig = {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
      environment: (process.env.NODE_ENV === 'production' ? 'live' : 'test') as
        | 'test'
        | 'live',
    };

    const stripeProvider = new StripeProvider(stripeConfig);
    this.providers.set('stripe', stripeProvider);
  }

  /**
   * Create payment intent for order
   */
  async createPaymentIntent(
    request: PaymentIntentRequest,
    provider: string = this.defaultProvider
  ): Promise<PaymentIntentResponse> {
    this.validatePaymentRequest(request);

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.createPaymentIntent(request);
  }

  /**
   * Confirm payment with payment method
   */
  async confirmPayment(
    request: PaymentConfirmRequest,
    provider: string = this.defaultProvider
  ): Promise<PaymentConfirmResponse> {
    if (!request.paymentIntentId) {
      throw new PaymentValidationError('Payment intent ID is required');
    }

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.confirmPayment(request);
  }

  /**
   * Process refund for payment
   */
  async refundPayment(
    request: RefundRequest,
    provider: string = this.defaultProvider
  ): Promise<RefundResponse> {
    this.validateRefundRequest(request);

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.refundPayment(request);
  }

  /**
   * Create payment method for customer
   */
  async createPaymentMethod(
    request: PaymentMethodRequest,
    provider: string = this.defaultProvider
  ): Promise<PaymentMethodResponse> {
    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.createPaymentMethod(request);
  }

  /**
   * Retrieve payment intent details
   */
  async retrievePaymentIntent(
    paymentIntentId: string,
    provider: string = this.defaultProvider
  ): Promise<PaymentIntentResponse> {
    if (!paymentIntentId) {
      throw new PaymentValidationError('Payment intent ID is required');
    }

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.retrievePaymentIntent(paymentIntentId);
  }

  /**
   * Retrieve payment details
   */
  async retrievePayment(
    paymentId: string,
    provider: string = this.defaultProvider
  ): Promise<PaymentConfirmResponse> {
    if (!paymentId) {
      throw new PaymentValidationError('Payment ID is required');
    }

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.retrievePayment(paymentId);
  }

  /**
   * Handle webhook from payment provider
   */
  async handleWebhook(
    payload: string,
    signature: string,
    provider: string = this.defaultProvider
  ): Promise<WebhookEvent> {
    if (!payload || !signature) {
      throw new PaymentValidationError(
        'Webhook payload and signature are required'
      );
    }

    const paymentProvider = this.getProvider(provider);
    return await paymentProvider.handleWebhook(payload, signature);
  }

  /**
   * Validate webhook signature
   */
  validateWebhookSignature(
    payload: string,
    signature: string,
    provider: string = this.defaultProvider
  ): boolean {
    const paymentProvider = this.getProvider(provider);
    return paymentProvider.validateWebhookSignature(payload, signature);
  }

  /**
   * Get provider instance
   */
  private getProvider(providerName: string): IPaymentProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new PaymentGatewayError(
        `Payment provider '${providerName}' not found`
      );
    }
    return provider;
  }

  /**
   * Validate payment intent request
   */
  private validatePaymentRequest(request: PaymentIntentRequest): void {
    if (!request.amount || request.amount <= 0) {
      throw new PaymentValidationError('Amount must be greater than 0');
    }

    if (!request.currency) {
      throw new PaymentValidationError('Currency is required');
    }

    if (!request.orderId) {
      throw new PaymentValidationError('Order ID is required');
    }
  }

  /**
   * Validate refund request
   */
  private validateRefundRequest(request: RefundRequest): void {
    if (!request.paymentId) {
      throw new PaymentValidationError('Payment ID is required for refund');
    }

    if (request.amount && request.amount <= 0) {
      throw new PaymentValidationError('Refund amount must be greater than 0');
    }
  }

  /**
   * Register new payment provider
   */
  registerProvider(name: string, provider: IPaymentProvider): void {
    this.providers.set(name, provider);
  }

  /**
   * Set default provider
   */
  setDefaultProvider(providerName: string): void {
    if (!this.providers.has(providerName)) {
      throw new PaymentGatewayError(
        `Provider '${providerName}' is not registered`
      );
    }
    this.defaultProvider = providerName;
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}
