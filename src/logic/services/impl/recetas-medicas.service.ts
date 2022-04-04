import { DBContext } from '@data/db.context';
import { RecetaMedica, RecetaMedicaProducto } from '@data/entities';
import {
  RecetaMedicaProductosRepository,
  RecetasMedicasRepository,
} from '@data/repositories';
import { injectable } from 'inversify';
import { getCustomRepository } from 'typeorm';
import { PrescriptionDetailResponse } from '../interfaces/IPrescriptionDetailResponse';
import { PrescriptionsByPatientResponse } from '../interfaces/IPrescriptionsByPatientResponse';
import { IService } from '../interfaces/IService.interface';

@injectable()
export class RecetasMedicasService implements IService<RecetaMedica> {
  constructor(private readonly _database: DBContext) {}

  async all(): Promise<[RecetaMedica[], number]> {
    try {
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async obtenerRecetasMedicasPorPaciente(
    pacienteId?: number
  ): Promise<[PrescriptionsByPatientResponse[], number]> {
    try {
      const recetasMedicasRepository = getCustomRepository(
        RecetasMedicasRepository
      );
      const qb = recetasMedicasRepository
        .createQueryBuilder('rm')
        .leftJoinAndSelect('rm.doctor', 'd')
        .innerJoinAndSelect('d.especialidad', 'es')
        .leftJoinAndSelect('rm.recetasMedicaProductos', 'rmp')
        .where(`rm.paciente_id = ${pacienteId}`)
        .orderBy('rm.fecha', 'DESC')
        .limit(5);

      const recetasMedicas = await qb.getManyAndCount();

      const recetasMedicasResponse = recetasMedicas[0].map(
        (recetaMedica: RecetaMedica) => {
          return {
            id: recetaMedica.id,
            fecha: recetaMedica.fecha,
            doctor: {
              id: recetaMedica.doctor.id,
              nombres: recetaMedica.doctor.nombres,
              apellidos: recetaMedica.doctor.apellidos,
              especialidad: recetaMedica.doctor.especialidad.nombre,
            },
          };
        }
      );

      if (recetasMedicasResponse.length > 0) {
        return [recetasMedicasResponse, recetasMedicasResponse.length];
      }

      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async obtenerDetalleDeRecetaMedica(
    recetaMedicaId?: number
  ): Promise<PrescriptionDetailResponse | undefined> {
    try {
      const recetasMedicasRepository = getCustomRepository(
        RecetasMedicasRepository
      );
      const qb = recetasMedicasRepository
        .createQueryBuilder('rm')
        .leftJoinAndSelect('rm.doctor', 'd')
        .leftJoinAndSelect('rm.paciente', 'p')
        .leftJoinAndSelect('d.especialidad', 'es')
        .leftJoinAndSelect('rm.recetasMedicaProductos', 'rmp')
        .where(`rm.id = ${recetaMedicaId}`);

      const recetaMedica = await qb.getManyAndCount();

      const detalleRecetasMedicaResponse = recetaMedica[0].map(
        (receta: RecetaMedica) => {
          return {
            id: receta.id,
            especialidad: receta.doctor.especialidad.nombre,
            paciente: receta.paciente.nombres + " " + receta.paciente.apellidos,
            fecha: receta.fecha,
            productos: receta.recetasMedicaProductos.map((rmp) => {
              return {
                nombre: rmp.nombreProducto,
                indicacion: rmp.indicacion,
              };
            }),
          };
        }
      );

      if (detalleRecetasMedicaResponse) {
        return detalleRecetasMedicaResponse[0];
      }

      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async obtenerRecetasMedicasParaFront(
    page: number = 1,
    limit: number = 10,
    doctorId?: number
  ): Promise<[any, number]> {
    try {
      const recetasMedicasRepository = getCustomRepository(
        RecetasMedicasRepository
      );
      const skip= (page-1) * limit;
      const qb = recetasMedicasRepository
        .createQueryBuilder('rm')
        .leftJoinAndSelect('rm.doctor', 'd')
        .leftJoinAndSelect('rm.paciente', 'p')
        .innerJoinAndSelect('d.especialidad', 'es')
        .leftJoinAndSelect('rm.recetasMedicaProductos', 'rmp')
        .orderBy('rm.id', 'ASC')
        .take(limit)
        .skip(skip);

      if (doctorId){
        qb.where(`d.id = ${doctorId}`);
      }

      const [result, total] = await qb.getManyAndCount();

      if (result) {
        const recetasMedicas = result.map((recetaMedica)=>{
          const productos = recetaMedica.recetasMedicaProductos.map((producto)=> producto?.nombreProducto);
          return {
            id: recetaMedica?.id,
            codigo: `AV-M-00${recetaMedica?.id}`,
            paciente: `${recetaMedica?.paciente?.nombres} ${recetaMedica?.paciente?.apellidos}`,
            created_date: recetaMedica?.fecha,
            medicamentos: productos?.join(',')
          }
        });

        const response = {
          listaRecords: recetasMedicas,
          numeroPaginas: Math.ceil(total/limit),
          totalRecords: total,
        }

        return [response, recetasMedicas.length]
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async crearRecetaMedica(
    crearRecetaMedicaDto: any
  ): Promise<Partial<RecetaMedica>> {
    try {
      crearRecetaMedicaDto.fecha = new Date();

      const recetasMedicasRepository = getCustomRepository(
        RecetasMedicasRepository
      );
      const recetaMedicaProductoRepository = getCustomRepository(
        RecetaMedicaProductosRepository
      );

      const recetaCreada: Partial<RecetaMedica> =
        await recetasMedicasRepository.save(crearRecetaMedicaDto);

      const recetaMedicaCreada = await recetasMedicasRepository.save({
        id: recetaCreada.id,
        codigo: `AV-M-00${recetaCreada.id}`,
        doctorId: recetaCreada.doctorId,
        pacienteId: recetaCreada.pacienteId,
      });

      crearRecetaMedicaDto.productos.forEach(async (producto: any) => {
        const productToSave = {
          recetaMedicaId: recetaCreada.id,
          nombreProducto: producto.productoNombre,
          indicacion: producto.indicacion,
        };

        const recetaMedicaProductoCreado: Partial<RecetaMedicaProducto> =
          await recetaMedicaProductoRepository.save(productToSave);
      });

      return recetaMedicaCreada;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
