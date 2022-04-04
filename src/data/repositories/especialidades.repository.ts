import { EntityRepository, Repository } from "typeorm";
import { Especialidad } from '../entities';

@EntityRepository(Especialidad)
export class EspecialidadesRepository extends Repository<Especialidad> {}