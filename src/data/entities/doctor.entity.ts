import {
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { RecetaMedica } from './receta_medica.entity';
import { CitaMedica } from './cita_medica.entity';
import { DoctorFecha } from './doctor_fecha.entity';
import { Especialidad } from './especialidad.entity';

@Entity({
  name: 'doctores',
})
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'especialidad_id',
    default: null,
  })
  especialidadId: number;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.doctores)
  @JoinColumn({
    name: 'especialidad_id',
    referencedColumnName: 'id',
  })
  especialidad: Especialidad;

  @Column({
    length: 64,
  })
  nombres: string;

  @Column({
    length: 64,
  })
  apellidos: string;

  @Column({
    type: 'bool',
    width: 1,
  })
  registrado: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha_registro: Date | null;

  @Column({
    length: 256,
  })
  cmp: string;

  @Column({
    length: 256,
  })
  codigo_essalud: string;

  @OneToMany(() => DoctorFecha, (doctorFecha) => doctorFecha.doctor)
  doctorFechas: DoctorFecha[];

  @OneToMany(() => CitaMedica, (citaMedica) => citaMedica.doctor)
  citasMedicas: CitaMedica[];

  @OneToMany(() => RecetaMedica, (recetasMedica) => recetasMedica.doctor)
  recetasMedicas: RecetaMedica[];
}
