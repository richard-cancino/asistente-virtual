import { singleResponse, StringUtils } from "@core/common";
import { ValidationConstants } from "@core/constants/validation";
import { CreateDoctorDto, UpdateDoctorDto } from "@logic/dtos";
import { DoctoresService } from "@logic/services/impl";
import { NextFunction, Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { BusinessError } from "../../core/common/business-error";
import { resultResponse } from "../../core/common/responses";
import { ValidateRequestMiddleware } from "../middlewares";

@controller("/doctores")
export class DoctoresController {
  private readonly entityName = "Doctores";

  constructor(private readonly _service: DoctoresService) {}

  @httpGet("/")
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      let especialidadId = undefined;

      req.query.especialidadId && (especialidadId = +req.query.especialidadId);
      const [result, count] = await this._service.all(
        especialidadId
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

  @httpGet("/:id")
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const doctor = await this._service.findOne(id);

      if (!doctor) {
        throw new BusinessError(
          StringUtils.format(
            ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
            this.entityName,
            id.toString()
          ),
          404
        );
      }

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_GET_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, doctor);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/front/list")
  async obtenerDoctoresParaFront(req: Request, res: Response, next: NextFunction) {
    try {
      let page = undefined;
      let pageSize = undefined;
      let registrado = undefined;

      req.query.page && (page = +req.query.page);
      req.query.pageSize && (pageSize = +req.query.pageSize);
      req.query.registrado && (registrado = req.query.registrado);

      const [result, count] = await this._service.obtenerDoctoresParaFront(
        page,
        pageSize,
        registrado
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

  @httpPost("/", ValidateRequestMiddleware.with(CreateDoctorDto))
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.create(req.body);

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

  @httpPut("/:id", ValidateRequestMiddleware.withParams(UpdateDoctorDto))
  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.updateOne(req.body);

      if (!result) {
        throw new BusinessError(
          StringUtils.format(
            ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
            this.entityName,
            req.body.id.toString()
          ),
          404
        );
      }

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_PUT_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpPut("/actualizar-registro/:doctorId")
  async actualizarEstadoDeRegistro(req: Request, res: Response, next: NextFunction) {
    try {
      const doctorId = Number(req?.params?.doctorId);
      const result = await this._service.actualizarEstadoDeRegistro(doctorId);

      if (!result) {
        throw new BusinessError(
          StringUtils.format(
            ValidationConstants.MESSAGE_RESPONSE_NOT_FOUND,
            this.entityName,
            req.body.id.toString()
          ),
          404
        );
      }

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_PUT_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  @httpDelete("/:id")
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const doctor = await this._service.findOne(id);

      if (!doctor) {
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

      const result = await this._service.deleteOne(id);

      const message = StringUtils.format(
        ValidationConstants.MESSAGE_RESPONSE_DELETE_SUCCESS,
        this.entityName
      );
      const response = singleResponse(message, true, result);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
