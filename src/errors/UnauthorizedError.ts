import BaseError, { BaseErrorItem } from './BaseError';

class UnauthorizedError extends BaseError {
  statusCode = 401;

  constructor(public message: string = 'Not authorized') {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): BaseErrorItem[] {
    return [{ message: this.message }];
  }
}

export default UnauthorizedError;
