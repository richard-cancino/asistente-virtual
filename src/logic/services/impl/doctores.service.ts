import { DBContext } from '@data/db.context';
import { Doctor } from '@data/entities/doctor.entity';
import { DoctoresRepository } from '@data/repositories/doctores.repository';
import { CreateDoctorDto, GetDoctorDto, UpdateDoctorDto } from '@logic/dtos';
import { injectable } from 'inversify';
import { DeleteResult, getCustomRepository } from 'typeorm';
import { IService } from '../interfaces/IService.interface';

@injectable()
export class DoctoresService implements IService<Doctor> {
  constructor(private readonly _database: DBContext) {}

  async all(especialidadId?: number): Promise<[Doctor[], number]> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const qb = await doctoresRepository
        .createQueryBuilder('d')
        .innerJoinAndSelect('d.especialidad', 'e')
        .leftJoinAndSelect('d.doctorFechas', 'df')
        .leftJoinAndSelect('d.citasMedicas', 'c');

      if (especialidadId) qb.where(`d.especialidad_id = ${especialidadId}`);

      const doctores = await qb.getManyAndCount();
      if (doctores[1]) {
        return GetDoctorDto.fromMany(doctores[0], doctores[1]);
      }
      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(id: number): Promise<Doctor | undefined> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const doctor = await doctoresRepository.findOne(
        { id },
        {
          relations: ['especialidad', 'doctorFechas', 'citasMedicas'],
        }
      );

      if (doctor) {
        return GetDoctorDto.from(doctor);
      }
      return undefined;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async obtenerDoctoresParaFront(
    page: number = 1,
    limit: number = 30,
    registrado?: any,
  ): Promise<[any, number]> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const skip= (page-1) * limit;
      const qb = doctoresRepository
        .createQueryBuilder('d')
        .innerJoinAndSelect('d.especialidad', 'e')
        .orderBy('d.id', 'ASC')
        .take(limit)
        .skip(skip);

      if (registrado) {
        qb.where(`d.registrado = ${registrado}`);
      }

      const [result, total] = await qb.getManyAndCount();
      const totalDb = await doctoresRepository.count();

      if(result){
        const doctores = result.map((doctor)=>{
          return {
            id: doctor.id,
            nombres: `${doctor.nombres} ${doctor.apellidos}`,
            especialidad: doctor.especialidad.nombre,
            estado: doctor.registrado ? 'Registrado' : 'Sin Registrar',
            fecha_registro: doctor.fecha_registro || '',
            cmp: doctor.cmp
          }
        })

        const response = {
          listaRecords: doctores,
          numeroPaginas: Math.ceil(total/limit),
          totalRecords: total,
          totalDb,
        }

        return [response, doctores.length];
      }

      return [[], 0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Partial<Doctor>> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const createdDoctor: Partial<Doctor> = await doctoresRepository.save(
        createDoctorDto
      );

      return CreateDoctorDto.from(createdDoctor);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne(
    updateDoctorDto: UpdateDoctorDto
  ): Promise<Partial<Doctor> | null> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const result = await doctoresRepository.update(
        {
          id: updateDoctorDto.id,
        },
        updateDoctorDto
      );

      if (result.affected == 0) {
        return null;
      }

      const savedDoctor = await doctoresRepository.findOne({
        id: updateDoctorDto.id,
      });

      return UpdateDoctorDto.from(savedDoctor as Partial<Doctor>);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async actualizarEstadoDeRegistro(doctorId: number): Promise<Partial<Doctor> | null> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const result = await doctoresRepository.update(
        {
          id: doctorId,
        },
        {
          registrado: true,
          fecha_registro: new Date()
        }
      );

      if (result.affected == 0) {
        return null;
      }

      const savedDoctor = await doctoresRepository.findOne({
        id: doctorId,
      });

      return UpdateDoctorDto.from(savedDoctor as Partial<Doctor>);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    try {
      const doctoresRepository = getCustomRepository(DoctoresRepository);
      const result: DeleteResult = await doctoresRepository.delete(id);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
