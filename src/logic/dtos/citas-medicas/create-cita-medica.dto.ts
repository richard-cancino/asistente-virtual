import { ValidationConstants } from '@core/constants/validation';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCitaMedicaDto {
  //data to receive
  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly doctorId: number;

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly pacienteId: number;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly especialidad: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly fecha_atencion: string;

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly hora_inicio: number;

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly hora_fin: number;
}