import { ValidationError } from 'express-validator';

import BaseError, { BaseErrorItem } from './BaseError';

class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): BaseErrorItem[] {
    return this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));
  }
}

export default RequestValidationError;
