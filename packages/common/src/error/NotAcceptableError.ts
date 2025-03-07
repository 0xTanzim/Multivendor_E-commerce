import { BaseError } from './BaseError';

export class NotAcceptableError extends BaseError {
  constructor(message = 'Not Acceptable') {
    super(message, 406);
  }
}


