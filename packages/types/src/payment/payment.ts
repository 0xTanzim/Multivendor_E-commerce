import { $Enums } from '@repo/database';

export type PaymentIntentRequest = {
  amount: number;
  currency: string;
  orderId: string;
  customerId?: string;
  metadata?: Record<string, any>;
};

export type PaymentIntentResponse = {
  id: string;
  clientSecret: string;
  status: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
};

export type PaymentConfirmRequest = {
  paymentIntentId: string;
  paymentMethodId?: string;
};

export type PaymentConfirmResponse = {
  id: string;
  status: $Enums.PaymentStatus;
  transactionId: string;
  amount: number;
  currency: string;
  confirmedAt?: Date;
  metadata?: Record<string, any>;
};

export type RefundRequest = {
  paymentId: string;
  amount?: number;
  reason?: string;
  metadata?: Record<string, any>;
};

export type RefundResponse = {
  id: string;
  status: string;
  amount: number;
  reason?: string;
  createdAt: Date;
};

export type PaymentMethodRequest = {
  type: 'card' | 'bank_account' | 'wallet';
  customerId?: string;
  metadata?: Record<string, any>;
};

export type PaymentMethodResponse = {
  id: string;
  type: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  customerId?: string;
};

export type WebhookEvent = {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
  livemode: boolean;
};

export type PaymentCreateInput = {
  orderId: string;
  transactionId: string;
  amount: number;
  currency?: string;
  status?: $Enums.PaymentStatus;
  provider?: string;
  metadata?: Record<string, any>;
};

export type PaymentUpdateInput = {
  status?: $Enums.PaymentStatus;
  confirmedAt?: Date;
  metadata?: Record<string, any>;
};
