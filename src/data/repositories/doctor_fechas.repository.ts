import { EntityRepository, Repository } from 'typeorm';
import { DoctorFecha } from '../entities';

@EntityRepository(DoctorFecha)
export class DoctorFechasRepository extends Repository<DoctorFecha> {}
