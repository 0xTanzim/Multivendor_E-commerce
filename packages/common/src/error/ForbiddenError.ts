import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(message = 'Access denied') {
    super(message, 403);
  }
}
