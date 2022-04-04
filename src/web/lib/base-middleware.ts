import { Response, Request, NextFunction } from 'express';
export abstract class BaseMiddleware {
  constructor() {
    this.execute = this.execute && this.execute.bind(this);
    this.executeWithError = this.executeWithError && this.executeWithError.bind(this);
  }

  public execute?(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void>

  public executeWithError?(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response<any, Record<string, any>>
}