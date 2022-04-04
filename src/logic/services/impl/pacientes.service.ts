import { Paciente } from "@data/entities";
import { PacientesRepository } from "@data/repositories";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { IService } from "../interfaces/IService.interface";
import { GetPacienteDto } from '@logic/dtos';
import { transformHHMMSingle } from '@core/common';

@injectable()
export class PacientesService implements IService<GetPacienteDto> {
  async all(nombres?: string): Promise<[GetPacienteDto[], number]> {
    try {
      const pacientesRepository = getCustomRepository(PacientesRepository);
      const qb = pacientesRepository.createQueryBuilder("p")
        .leftJoinAndSelect("p.citasMedicas", "cm");
      
      console.log(nombres)
      if (nombres) {
        qb.where(`p.nombres like '%${nombres}%'`)
        .orWhere(`p.apellidos like '%${nombres}%'`);
      }

      const pacientes = await qb.getManyAndCount();

      if (pacientes[1]) {
        pacientes[0].forEach(pa => pa.citasMedicas.forEach((cm) => {
          const [start, end] = transformHHMMSingle(cm.hora_inicio, cm.hora_fin);
          cm.hora_inicio = start as any;
          cm.hora_fin = end as any;
        }))

        return GetPacienteDto.fromMany(pacientes[0], pacientes[1]);
      }
      return [[], 0];
    } catch(error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<GetPacienteDto | undefined> {
    try {
      const pacientesRepository = getCustomRepository(
        PacientesRepository
      );
      const paciente = await pacientesRepository.findOne({id}, {
        relations: ['citasMedicas']
      });

      if (paciente) {
        paciente.citasMedicas.forEach((cm) => {
          const [start, end] = transformHHMMSingle(cm.hora_inicio, cm.hora_fin);
          cm.hora_inicio = start as any;
          cm.hora_fin = end as any;
        });

        return GetPacienteDto.from(paciente);
      } 
      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
