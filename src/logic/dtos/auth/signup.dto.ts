import { ValidationConstants } from '@core/constants/validation';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly nombres: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly apellidos: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly telefono: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly direccion: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly fechaNacimiento: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly codigoConadis: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_STRING,
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY,
  })
  readonly password: string;
}
