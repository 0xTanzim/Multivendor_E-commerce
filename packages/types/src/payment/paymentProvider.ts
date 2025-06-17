import {
  PaymentIntentRequest,
  PaymentIntentResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  RefundRequest,
  RefundResponse,
  PaymentMethodRequest,
  PaymentMethodResponse,
  WebhookEvent,
} from './payment';

export interface IPaymentProvider {
  createPaymentIntent(
    request: PaymentIntentRequest
  ): Promise<PaymentIntentResponse>;
  confirmPayment(
    request: PaymentConfirmRequest
  ): Promise<PaymentConfirmResponse>;
  refundPayment(request: RefundRequest): Promise<RefundResponse>;
  createPaymentMethod(
    request: PaymentMethodRequest
  ): Promise<PaymentMethodResponse>;
  retrievePaymentIntent(
    paymentIntentId: string
  ): Promise<PaymentIntentResponse>;
  retrievePayment(paymentId: string): Promise<PaymentConfirmResponse>;
  handleWebhook(payload: string, signature: string): Promise<WebhookEvent>;
  validateWebhookSignature(payload: string, signature: string): boolean;
}

export type PaymentProviderType = 'stripe' | 'paypal' | 'razorpay';

export type PaymentProviderConfig = {
  type: PaymentProviderType;
  apiKey: string;
  secretKey: string;
  webhookSecret?: string;
  environment: 'test' | 'live';
};
