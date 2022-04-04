import { PacientesService } from "@logic/services/impl";
import { Request, Response, NextFunction } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { ValidationConstants } from '@core/constants/validation';
import { BusinessError, singleResponse, resultResponse, StringUtils } from '@core/common';

@controller("/pacientes")
export class PacientesController {
  private readonly entityName = "Pacientes";

  constructor(private readonly _service: PacientesService) {}

  @httpGet("/")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const nombres = req.query.nombres as string;
      const [result, count] = await this._service.all(nombres);

      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS, this.entityName);
      const response = resultResponse(count, message, true, result);

      res.status(200).send(response);

    } catch (error) {
      next(error);
    }
  }

  @httpGet("/:id")
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const result = await this._service.findOne(id);

      if (!result) {
        throw new BusinessError(
          StringUtils.format(
            ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
            this.entityName,
            id.toString()
          ),
          404
        );
      }

      const message = StringUtils.format(ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS, this.entityName);
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
