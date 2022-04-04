import { DoctorFecha } from '../../../data/entities/doctor_fecha.entity';

export class GetDoctorFechasDto {
  constructor(
    private readonly id: number,
    private readonly doctorId: number,
    private readonly fecha: string
  ) {}

  static from(entity: DoctorFecha) {
    return new GetDoctorFechasDto(entity.id, entity.doctorId, entity.fecha);
  }

  static fromMany(
    doctorFechas: DoctorFecha[],
    count: number
  ): [GetDoctorFechasDto[], number] {
    const docs: GetDoctorFechasDto[] = doctorFechas.map((doctorFecha) =>
      GetDoctorFechasDto.from(doctorFecha)
    );
    return [docs, count];
  }
}
