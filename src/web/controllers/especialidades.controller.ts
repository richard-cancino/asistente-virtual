import { EspecialidadesService } from "@logic/services/impl";
import { Request, Response, NextFunction } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { ValidationConstants } from '@core/constants/validation';
import { BusinessError, singleResponse, resultResponse, StringUtils } from '@core/common';

@controller("/especialidades")
export class EspecialidadesController {
  private readonly entityName = "Especialidades";

  constructor(private readonly _service: EspecialidadesService) {}

  @httpGet("/")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const [result, count] = await this._service.all();

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
      const especialidad = await this._service.findOne(id);

      if (!especialidad) {
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
      const response = singleResponse(message, true, especialidad);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
