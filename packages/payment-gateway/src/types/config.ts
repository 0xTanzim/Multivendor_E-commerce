export type StripeConfig = {
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  apiVersion?: string;
  environment: 'test' | 'live';
};

export type PayPalConfig = {
  clientId: string;
  clientSecret: string;
  environment: 'sandbox' | 'production';
  webhookId?: string;
};

export type PaymentGatewayConfig = {
  stripe?: StripeConfig;
  paypal?: PayPalConfig;
  defaultProvider: 'stripe' | 'paypal';
};
