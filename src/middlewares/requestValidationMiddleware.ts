import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import RequestValidationError from '../errors/RequestValidationError';

function requestValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  return next();
}

export default requestValidationMiddleware;
