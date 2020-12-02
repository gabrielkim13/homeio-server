import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';

import UnauthorizedError from '../errors/UnauthorizedError';

interface Token {
  iat: number;
  exp: number;
  sub: string;
}

function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization)
    throw new UnauthorizedError('Missing authorization header');

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, auth.jwt.secret) as Token;

    req.user = { id: sub };

    return next();
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }
}

export default authenticationMiddleware;
