import {
  singleResponse,
  StringUtils,
  BusinessError,
  resultResponse,
} from "@core/common";
import { ValidationConstants } from "@core/constants/validation";
import { CreateCitaMedicaDto } from "@logic/dtos";
import { CitasMedicasService } from "@logic/services/impl";
import { NextFunction, Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { AuthMiddleware, ValidateRequestMiddleware } from '../middlewares';

@controller("/citas-medicas")
export class CitasMedicasController {
  private readonly entityName = "Citas Medicas";

  constructor(private readonly _service: CitasMedicasService) {}

  @httpGet("/")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      let doctorId = undefined;
      let pacienteId = undefined;
      req.query.doctorId && (doctorId = +req.query.doctorId);
      req.query.pacienteId && (pacienteId = +req.query.pacienteId);

      const [result, count] = await this._service.all(doctorId, pacienteId);

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

      const message = 'Test for this endpoint'

      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/por-paciente/:pacienteId', AuthMiddleware.handler())
  async obtenerCitasMedicasPorPaciente(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const pacienteId = Number(req.params.pacienteId);
      const [result, count] =
        await this._service.obtenerCitasMedicasPorPaciente(pacienteId);

      const message = 'Test for this endpoint'
      const response = resultResponse(count, message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPost(
    '/',
    ValidateRequestMiddleware.with(CreateCitaMedicaDto),
    AuthMiddleware.handler()
  )
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.create(req.body);

      const message = 'Test for this endpoint'

      const response = singleResponse(message, true, result);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete('/:id', AuthMiddleware.handler())
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const citaMedica = await this._service.findOne(id, false);

      if (!citaMedica) {
        return res
          .status(404)
          .send(
            singleResponse(
              StringUtils.format(
                ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
                this.entityName,
                id.toString()
              ),
              false
            )
          );
      }

      const result = await this._service.deleteOne(citaMedica);

      const message = 'Test for this endpoint'

      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
