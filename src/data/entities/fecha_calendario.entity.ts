import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorFecha } from './doctor_fecha.entity';

@Entity({
  name: 'fechas_calendario',
})
export class FechaCalendario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'doctor_fecha_id',
    default: null,
  })
  doctorFechaId: number;

  @ManyToOne(() => DoctorFecha, (doctorFecha) => doctorFecha.fechasCalendario)
  @JoinColumn({
    name: 'doctor_fecha_id',
    referencedColumnName: 'id',
  })
  doctorFecha: DoctorFecha;

  @Column({
    type: 'int',
  })
  hora_inicio: number;

  @Column({
    type: 'int',
  })
  hora_fin: number;

  @Column()
  disponible: boolean;
}
