import { ValidationConstants } from '@core/constants/validation';
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Doctor } from '../../../data/entities/doctor.entity';

export class CreateDoctorDto {
  //data to receive

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
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly nombres: string;

  @IsString({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_INT
  })
  @IsNotEmpty({
    message: ValidationConstants.VALIDATION_MESSAGE_IS_NOT_EMPTY
  })
  readonly apellidos: string;


  // data to return

  static from(entity: Partial<Doctor>) {
    return {
      nombres: entity.nombres,
      apellidos: entity.apellidos
    }
  }

  static fromMany(doctores: Partial<Doctor>[]) {
    return doctores.map(doctor => CreateDoctorDto.from(doctor));
  }
}