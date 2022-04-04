import { Especialidad } from '@data/entities';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ValidationConstants } from '@core/constants/validation';
import { Doctor } from '@data/entities';
export class GetEspecialidadDto {
  constructor(
    private readonly nombre: string,
    private readonly doctores: Doctor[],
  ) {}

  static from(entity: Especialidad) {
    return {...entity}
  }

  static fromMany(especialidades: Especialidad[], count: number): [Especialidad[], number] {
    const docs: Especialidad[] = especialidades.map(especialidad => GetEspecialidadDto.from(especialidad));
    return [
      docs,
      count
    ]
  }
}