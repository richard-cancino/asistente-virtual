import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor, Paciente, RecetaMedicaProducto } from '.';

@Entity({
  name: 'recetas_medicas',
})
export class RecetaMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'doctor_id',
    default: null,
  })
  doctorId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.recetasMedicas)
  @JoinColumn({
    name: 'doctor_id',
    referencedColumnName: 'id',
  })
  doctor: Doctor;

  @Column({
    type: 'int',
    name: 'paciente_id',
    default: null,
  })
  pacienteId: number;

  @ManyToOne(() => Paciente, (paciente) => paciente.recetasMedicas)
  @JoinColumn({
    name: 'paciente_id',
    referencedColumnName: 'id',
  })
  paciente: Paciente;

  @Column({
    type: 'date',
  })
  fecha: string;

  @Column({
    length: 256,
    default: null,
  })
  codigo: string;

  @OneToMany(
    () => RecetaMedicaProducto,
    (recetasMedicaProducto) => recetasMedicaProducto.recetaMedica
  )
  recetasMedicaProductos: RecetaMedicaProducto[];
}
