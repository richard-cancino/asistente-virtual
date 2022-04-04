import { EntityRepository, Repository } from 'typeorm';
import { FechaCalendario } from '../entities';

@EntityRepository(FechaCalendario)
export class FechasCalendarioRepository extends Repository<FechaCalendario> {}
