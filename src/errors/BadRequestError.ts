import BaseError, { BaseErrorItem } from './BaseError';

class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): BaseErrorItem[] {
    return [{ message: this.message }];
  }
}

export default BadRequestError;
