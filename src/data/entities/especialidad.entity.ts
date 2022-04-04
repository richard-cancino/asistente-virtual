import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from './doctor.entity';

@Entity({
  name: 'especialidades'
})
export class Especialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  nombre: string;

  @OneToMany(() => Doctor, doctor => doctor.especialidad)
  doctores: Doctor[];
}