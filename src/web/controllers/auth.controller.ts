import { NextFunction, Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';

import { StringUtils, singleResponse } from '@core/common';
import { ValidationConstants } from '@core/constants/validation';
import { SignupDto } from '@logic/dtos/auth/signup.dto';
import { AuthService } from '@logic/services/impl/auth.service';
import { ValidateRequestMiddleware } from '@web/middlewares';
import { LoginDto } from '@logic/dtos/auth/login.dto';

@controller('/auth')
export class AuthController {
  private readonly entityName = 'Auth';

  constructor(private readonly _service: AuthService) {}

  @httpPost('/signup', ValidateRequestMiddleware.with(SignupDto))
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.signup(req.body);
      if (result.success) {
        const message = StringUtils.format(
          ValidationConstants.MESSAGE_RESPONSE_POST_SUCCESS,
          this.entityName
        );
        const response = singleResponse(message, true, result.data);
        res.status(201).send(response);
      } else {
        const badResponse = singleResponse(result.message || '', false, null);
        res.status(409).send(badResponse);
      }
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/login', ValidateRequestMiddleware.with(LoginDto))
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.login(req.body);
      if (result.success) {
        const message = StringUtils.format(
          ValidationConstants.MESSAGE_RESPONSE_POST_SUCCESS,
          this.entityName
        );
        const response = singleResponse(message, true, result.data);
        res.status(201).send(response);
      } else {
        const badResponse = singleResponse(result.message || '', false, null);
        res.status(409).send(badResponse);
      }
    } catch (error) {
      next(error);
    }
  }
}
