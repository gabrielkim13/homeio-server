export interface BaseErrorItem {
  message: string;
  field?: string;
}

abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): BaseErrorItem[];
}

export default BaseError;
