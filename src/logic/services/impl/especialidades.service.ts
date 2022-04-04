import { Especialidad } from "@data/entities/especialidad.entity";
import { EspecialidadesRepository } from "@data/repositories/especialidades.repository";
import { injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { GetEspecialidadDto } from "../../dtos";
import { IService } from "../interfaces/IService.interface";

@injectable()
export class EspecialidadesService implements IService<Especialidad> {
  async all(): Promise<[Especialidad[], number]> {
    try {
      const especialidadesRepository = getCustomRepository(EspecialidadesRepository);
      const especialidades = await especialidadesRepository.findAndCount();

      if (especialidades[1]) {
        return GetEspecialidadDto.fromMany(especialidades[0], especialidades[1]);
      }
      return [[], 0];
    } catch(error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<Especialidad | undefined> {
    try {
      const especialidadesRepository = getCustomRepository(
        EspecialidadesRepository
      );
      const especialidad = await especialidadesRepository.findOne(id);

      if (especialidad) {
        return GetEspecialidadDto.from(especialidad);
      } 
      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
