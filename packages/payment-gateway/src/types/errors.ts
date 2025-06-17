import { BaseError } from '@repo/common/error';

export class PaymentGatewayError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
    this.name = 'PaymentGatewayError';
  }
}

export class PaymentProviderError extends BaseError {
  constructor(message: string, provider: string, statusCode: number = 500) {
    super(`${provider}: ${message}`, statusCode);
    this.name = 'PaymentProviderError';
  }
}

export class PaymentValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'PaymentValidationError';
  }
}

export class PaymentProcessingError extends BaseError {
  constructor(message: string) {
    super(message, 402);
    this.name = 'PaymentProcessingError';
  }
}

export class WebhookValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'WebhookValidationError';
  }
}
