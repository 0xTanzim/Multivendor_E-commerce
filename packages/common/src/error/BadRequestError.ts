import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}
