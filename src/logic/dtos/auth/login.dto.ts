import { ValidationConstants } from '@core/constants/validation';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
