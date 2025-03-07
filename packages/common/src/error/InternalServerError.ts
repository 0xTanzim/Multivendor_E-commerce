import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}
