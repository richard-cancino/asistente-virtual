import { DBContext } from "@data/db.context";
import { CitaMedica } from "@data/entities";
import { CitasMedicasRepository } from "@data/repositories";
import { CreateCitaMedicaDto } from "@logic/dtos";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";
import { transformHHMMSingle } from "@core/common";
import { DoctorFechasRepository } from "@data/repositories/doctor_fechas.repository";
import { FechasCalendarioRepository } from "@data/repositories/fechas_calendario.repository";
import { DoctorFecha } from "../../../data/entities/doctor_fecha.entity";
import { FechaCalendario } from "../../../data/entities/fecha_calendario.entity";

@injectable()
export class CitasMedicasService implements IService<CitaMedica> {
  constructor(private readonly _database: DBContext) {}

  async all(
    doctorId?: number,
    pacienteId?: number
  ): Promise<[CitaMedica[], number]> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const qb = citasMedicasRepository
        .createQueryBuilder("cm")
        .leftJoinAndSelect("cm.doctor", "d")
        .leftJoinAndSelect("cm.paciente", "p");

      if (doctorId) {
        qb.where(`cm.doctor_id = ${doctorId}`);
      }

      if (pacienteId) {
        qb.andWhere(`cm.paciente_id = ${pacienteId}`);
      }

      const citasMedicas = await qb.getManyAndCount();

      citasMedicas[0].forEach((cm) => {
        const [start, end] = transformHHMMSingle(cm.hora_inicio, cm.hora_fin);
        cm.hora_inicio = start as any;
        cm.hora_fin = end as any;
      });

      if (citasMedicas[1]) {
        return citasMedicas;
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number, formatHours: boolean = true): Promise<CitaMedica | undefined> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const citaMedica = await citasMedicasRepository.findOne(
        { id },
        {
          relations: ["doctor", "paciente"],
        }
      );

      if (citaMedica && formatHours) {
        const [start, end] = transformHHMMSingle(
          citaMedica.hora_inicio,
          citaMedica.hora_fin
        );
        citaMedica.hora_inicio = start as any;
        citaMedica.hora_fin = end as any;
      }

      return citaMedica;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async obtenerCitasMedicasPorPaciente(
    pacienteId: number
  ): Promise<[any[], number]> {
    try {
      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const qb = citasMedicasRepository
        .createQueryBuilder('cm')
        .leftJoinAndSelect('cm.doctor', 'd')
        .innerJoinAndSelect('d.especialidad', 'es')
        .where(`cm.paciente_id = ${pacienteId}`)
        .orderBy('cm.fecha_atencion', 'DESC')
        .limit(5);

      const citasMedicas = await qb.getManyAndCount();

      const citasMedicasResponse = citasMedicas[0].map(
        (citaMedica: CitaMedica) => {
          return {
            id: citaMedica.id,
            fecha: citaMedica.fecha_atencion,
            doctor: {
              id: citaMedica.doctor.id,
              nombres: citaMedica.doctor.nombres,
              apellidos: citaMedica.doctor.apellidos,
              especialidad: citaMedica.doctor.especialidad.nombre,
            },
          };
        }
      );

      if (citasMedicasResponse.length > 0) {
        return [citasMedicasResponse, citasMedicasResponse.length];
      }

      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(
    createCitaMedicaDto: CreateCitaMedicaDto
  ): Promise<Partial<CitaMedica>> {
    try {
      const doctorFechasRepository = getCustomRepository(
        DoctorFechasRepository
      );

      const fechaCalendarioRepository = getCustomRepository(
        FechasCalendarioRepository
      );

      const citasMedicasRepository = getCustomRepository(
        CitasMedicasRepository
      );
      const fecha = createCitaMedicaDto.fecha_atencion.split("-").join("");

      const doctorFechas = await doctorFechasRepository
        .createQueryBuilder("df")
        .innerJoinAndSelect("df.doctor", "do")
        .innerJoinAndSelect("do.especialidad", "es")
        .innerJoinAndSelect("df.fechasCalendario", "fc")
        .where(
          `es.nombre = '${createCitaMedicaDto.especialidad}' and
        df.fecha = '${fecha}' 
        and do.id = ${createCitaMedicaDto.doctorId} and fc.disponible = 1`
        )
        .getManyAndCount();

      doctorFechas[0].forEach((df: DoctorFecha) => {
        df.fechasCalendario.forEach(async (fc: FechaCalendario) => {
          if (
            fc.hora_fin === createCitaMedicaDto.hora_fin &&
            fc.hora_inicio === createCitaMedicaDto.hora_inicio
          ) {
            fc.disponible = false;
            await fechaCalendarioRepository.save(fc); // fecha calendario pasa a estar no disponible
          }
        });
      });

      const createdCitaMedica: Partial<CitaMedica> =
        await citasMedicasRepository.save(createCitaMedicaDto);

      return createdCitaMedica;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(citaMedica: CitaMedica): Promise<any> {
    try {
      const citasMedicasRepository = getCustomRepository(CitasMedicasRepository);
      const doctorFechasRepository = getCustomRepository(
        DoctorFechasRepository
      );
      const fechaCalendarioRepository = getCustomRepository(
        FechasCalendarioRepository
      );

      const doctorFechas = await doctorFechasRepository
        .createQueryBuilder("df")
        .innerJoinAndSelect("df.fechasCalendario", "fc")
        .where(`df.fecha = '${citaMedica.fecha_atencion}'`)
        .andWhere(`fc.hora_inicio = '${citaMedica.hora_inicio}'`)
        .andWhere(`fc.hora_fin = '${citaMedica.hora_fin}'`)
        .getOne();

      if(doctorFechas) {
        await fechaCalendarioRepository.update(
          {id: doctorFechas?.fechasCalendario[0]?.id},
          {disponible: true}
        );
      }

      const result: any =citasMedicasRepository.delete({id: citaMedica.id});
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

