import { BaseError } from './BaseError';

export class RequestTimeoutError extends BaseError {
  constructor(message = 'Request Timeout') {
    super(message, 408);
  }
}
