import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BaseMiddleware } from '../lib/base-middleware';
import { singleResponse } from '@core/common';

export class AuthMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.body.token || req.headers['token'];

    if (!token) {
      const badResponse = singleResponse(
        'El token es necesario para la autenticación.',
        false,
        null
      );
      res.status(403).send(badResponse);
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      console.log('decoded', decoded);
    } catch (err) {
      const badResponse = singleResponse('Token inválido', false, null);
      res.status(401).send(badResponse);
    }

    next();
  }

  static handler() {
    return new AuthMiddleware().execute;
  }
}
