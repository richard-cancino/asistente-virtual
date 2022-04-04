import { EntityRepository, Repository } from "typeorm";
import { Paciente } from '../entities';

@EntityRepository(Paciente)
export class PacientesRepository extends Repository<Paciente> {}