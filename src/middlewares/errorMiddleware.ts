import { Request, Response, NextFunction } from 'express';

import BaseError from '../errors/BaseError';

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  return res.status(500).send({
    errors: [{ message: 'Internal server error' }],
  });
}

export default errorMiddleware;
