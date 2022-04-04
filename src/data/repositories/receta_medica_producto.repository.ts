import { EntityRepository, Repository } from 'typeorm';
import { RecetaMedicaProducto } from '../entities';

@EntityRepository(RecetaMedicaProducto)
export class RecetaMedicaProductosRepository extends Repository<RecetaMedicaProducto> {}
