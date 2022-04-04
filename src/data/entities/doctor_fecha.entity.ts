import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { FechaCalendario } from './fecha_calendario.entity';

@Entity({
  name: 'doctor_fechas',
})
export class DoctorFecha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'doctor_id',
    default: null,
  })
  doctorId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorFechas)
  @JoinColumn({
    name: 'doctor_id',
    referencedColumnName: 'id',
  })
  doctor: Doctor;

  @Column({
    type: 'date',
  })
  fecha: string;

  @OneToMany(
    () => FechaCalendario,
    (fechaCalendario) => fechaCalendario.doctorFecha
  )
  fechasCalendario: FechaCalendario[];
}
