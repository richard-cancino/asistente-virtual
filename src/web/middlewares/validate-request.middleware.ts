import { Response, Request, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { BaseMiddleware } from "../lib/base-middleware";
import { validate } from "class-validator";

export class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly _dtoClass: any,
    private readonly _withParams = false
  ) {
    super();
  }
  
  public async execute(
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    if (this._withParams) {
      req.body = {
        ...req.body,
        ...req.params,
        ... (req.params.id && {id: +req.params.id})
      }
    }

    const dto = plainToClass(this._dtoClass, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return next(errors);
    }

    req.body = dto;
    next();
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto, false).execute;
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute;
  }
}
