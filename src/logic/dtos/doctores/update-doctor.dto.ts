import { ValidationConstants } from '@core/constants/validation';
import { Doctor } from '@data/entities';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  //data to receive
  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly id: number;

  @IsInt({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly especialidadId: number;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsOptional()
  readonly nombres: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsOptional()
  readonly apellidos: string;


  // data to return

  static from(entity: Partial<Doctor>) {
    return {
      nombres: entity.nombres,
      apellidos: entity.apellidos
    }
  }

  static fromMany(doctores: Partial<Doctor>[]) {
    return doctores.map(doctor => UpdateDoctorDto.from(doctor));
  }
}