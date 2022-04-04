import { resultResponse, singleResponse, StringUtils } from "@core/common";
import { ValidationConstants } from "@core/constants/validation";
import { GetByEspecialidadAndFechaDto } from "@logic/dtos";
import { DoctorFechasService } from "@logic/services/impl";
import { ValidateRequestMiddleware } from "@web/middlewares";
import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";

@controller("/doctor-fechas")
export class DoctorFechasController {
  private readonly entityName = "DoctorFechas";

  constructor(private readonly _service: DoctorFechasService) {}

  @httpGet("/:doctorId?")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorId = +req.params.doctorId;
      const [result, count] = await this._service.all(doctorId);

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS,
        this.entityName
      );
      const response = resultResponse(count, message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPost(
    "/buscar",
    ValidateRequestMiddleware.with(GetByEspecialidadAndFechaDto)
  )
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      req.query.index
        ? (req.body.index = +req.query.index)
        : (req.body.index = 0);

      const result = await this._service.findByEspecialidadAndFecha(req.body);
      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
}
