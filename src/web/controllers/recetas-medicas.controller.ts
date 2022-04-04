import { StringUtils, resultResponse, singleResponse } from '@core/common';
import { ValidationConstants } from '@core/constants/validation';
import { RecetasMedicasService } from '@logic/services/impl';
import { AuthMiddleware } from '@web/middlewares';
import { NextFunction, Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';

@controller('/recetas-medicas')
export class RecetasMedicasController {
  private readonly entityName = 'Recetas Medicas';

  constructor(private readonly _service: RecetasMedicasService) {}

  @httpGet('/por-paciente/:pacienteId', AuthMiddleware.handler())
  async obtenerRecetasMedicasPorPaciente(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const pacienteId = Number(req.params.pacienteId);
      const [result, count] =
        await this._service.obtenerRecetasMedicasPorPaciente(pacienteId);

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

  @httpGet('/detalle/:recetaMedicaId')
  async obtenerDetalleDeRecetaMedica(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const recetaMedicaId = Number(req.params.recetaMedicaId);
      const result = await this._service.obtenerDetalleDeRecetaMedica(
        recetaMedicaId
      );

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/front/list')
  async obtenerRecetasMedicasParFront(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let page = undefined;
      let pageSize = undefined;
      let doctorId = undefined;

      req.query.page && (page = +req.query.page);
      req.query.pageSize && (pageSize = +req.query.pageSize);
      req.query.doctorId && (doctorId = +req.query.doctorId);

      const [result, count] =
        await this._service.obtenerRecetasMedicasParaFront(
          page,
          pageSize,
          doctorId
        );

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

  @httpPost('/')
  async crearRecetaMedica(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.crearRecetaMedica(req.body);

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_POST_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }
}
