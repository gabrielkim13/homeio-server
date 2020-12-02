import BaseError, { BaseErrorItem } from './BaseError';

class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(public message: string = 'Not found') {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): BaseErrorItem[] {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
