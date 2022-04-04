import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationConstants } from '@core/constants/validation';
import { BusinessError } from '../../core/common/business-error';
import { singleResponse } from '../../core/common/responses';
import { BaseMiddleware } from '../lib/base-middleware';

export class ErrorHandlerMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }

  public executeWithError(
    err: any,
    _: Request,
    res: Response,
    _2: NextFunction
  ) {
    console.log(err);
    let code = 500;
    let response: any;
    if (err instanceof BusinessError) {
      code = err.code
      response = singleResponse(err.message, false);
    } else if (err instanceof Array && err[0] instanceof ValidationError) {
      code = 400;
      let message: unknown[] = [];
      let erroObj: any;
      err.forEach(validationError => {
        const field = validationError.property;
        erroObj = { field, message: [] }
        for (const validationMessage of Object.values(validationError.constraints)) {
          erroObj.message.push(validationMessage)
        }
        message.push(erroObj);
      });
      response = singleResponse(ValidationConstants.VALIDATION_DTO, false, message);
    } else if (err.message.includes("Duplicate")) {
      err.message = ValidationConstants.MESSAGE_RESPONSE_DUPLICATE;
      response = singleResponse(err.message , false);
    } else {
      response = singleResponse(err.message, false);
    }
    return res.status(code).send(response);
  }

  static handleError() {
    return new ErrorHandlerMiddleware().executeWithError
  }
}