import { EntityRepository, Repository } from 'typeorm';
import { CitaMedica } from '../entities';

@EntityRepository(CitaMedica)
export class CitasMedicasRepository extends Repository<CitaMedica> {}
