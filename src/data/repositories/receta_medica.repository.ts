import { EntityRepository, Repository } from 'typeorm';
import { RecetaMedica } from '../entities';

@EntityRepository(RecetaMedica)
export class RecetasMedicasRepository extends Repository<RecetaMedica> {}
