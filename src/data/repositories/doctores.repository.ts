import { EntityRepository, Repository } from "typeorm";
import { Doctor } from '../entities';

@EntityRepository(Doctor)
export class DoctoresRepository extends Repository<Doctor> {}