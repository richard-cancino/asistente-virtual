import { injectable } from 'inversify';
import { getCustomRepository } from 'typeorm';
import { DoctorFecha } from '@data/entities/doctor_fecha.entity';
import { DoctorFechasRepository } from '@data/repositories/doctor_fechas.repository';
import { IService } from '../interfaces/IService.interface';
import { GetDoctorFechasDto } from '../../dtos/doctor-fechas/get-doctor-fechas.dto';
import { transformHHMM, transformHHMMSingle } from '../../../core/common/utils';
import { GetByEspecialidadAndFechaDto } from '@logic/dtos/doctor-fechas/get-by-especialidad-fecha.dto';
import { ResponseByEspecialidadAndFecha } from '../interfaces/IResponseByEspecialidadAndFecha';

@injectable()
export class DoctorFechasService implements IService<GetDoctorFechasDto> {
  async all(doctorId?: number): Promise<[GetDoctorFechasDto[], number]> {
    try {
      const doctorFechasRepository = getCustomRepository(
        DoctorFechasRepository
      );
      let doctorFechas: [DoctorFecha[], number];
      if (doctorId) {
        doctorFechas = await doctorFechasRepository.findAndCount({
          doctorId,
        });
      } else {
        doctorFechas = await doctorFechasRepository.findAndCount();
      }

      transformHHMM(doctorFechas);

      if (doctorFechas![1]) {
        return GetDoctorFechasDto.fromMany(doctorFechas![0], doctorFechas![1]);
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByEspecialidadAndFecha({
    especialidad,
    fecha,
    index,
  }: GetByEspecialidadAndFechaDto): Promise<
    ResponseByEspecialidadAndFecha | undefined
  > {
    fecha = fecha.split('-').join('');
    try {
      const doctorFechasRepository = getCustomRepository(
        DoctorFechasRepository
      );

      const qb = doctorFechasRepository
        .createQueryBuilder('df')
        .innerJoinAndSelect('df.doctor', 'do')
        .innerJoinAndSelect('do.especialidad', 'es')
        .innerJoinAndSelect('df.fechasCalendario', 'fc')
        .where(`es.nombre = '${especialidad}' and
        df.fecha = '${fecha}' and fc.disponible = 1`);

      const doctorFechas = await qb.getManyAndCount();

      const doctorsResponse = doctorFechas[0].map((dFecha: DoctorFecha) => {
        return {
          id: dFecha.doctorId,
          nombres: dFecha.doctor.nombres,
          apellidos: dFecha.doctor.apellidos,
          especialidad: dFecha.doctor.especialidad.nombre,
          fechasDisponibles: [
            {
              fecha: dFecha.fecha,
              horarios: dFecha.fechasCalendario.map((fCalendario) => {
                const [startTime, endTime] = transformHHMMSingle(
                  fCalendario.hora_inicio,
                  fCalendario.hora_fin
                );
                return {
                  horaInicio: startTime,
                  horaFin: endTime,
                };
              }),
            },
          ],
        };
      });

      if (index < doctorsResponse.length) {
        return doctorsResponse[index];
      }
      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
