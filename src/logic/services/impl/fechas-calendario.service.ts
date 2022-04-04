import { injectable } from 'inversify';
import { getCustomRepository } from 'typeorm';

import { DBContext } from '@data/db.context';
import { FechaCalendario } from '@data/entities/fecha_calendario.entity';
import { FechasCalendarioRepository } from '@data/repositories';
import { IService } from '../interfaces/IService.interface';

@injectable()
export class FechasCalendarioService implements IService<FechaCalendario> {
  constructor(private readonly _database: DBContext) {}

  async all(): Promise<[FechaCalendario[], number]> {
    try {
      const fechasAtencionRepository = getCustomRepository(
        FechasCalendarioRepository
      );
      const fechas = await fechasAtencionRepository.findAndCount();

      return fechas;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<FechaCalendario | undefined> {
    try {
      const fechasAtencionRepository = getCustomRepository(
        FechasCalendarioRepository
      );
      const fecha = await fechasAtencionRepository.findOne(id);

      return fecha;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
