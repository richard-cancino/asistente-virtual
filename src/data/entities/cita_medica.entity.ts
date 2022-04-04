import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Paciente } from './paciente.entity';

@Entity({
  name: 'citas_medicas'
})
export class CitaMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    name: "doctor_id",
    default: null
  })
  doctorId: number;

  @ManyToOne(() => Doctor, doctor => doctor.citasMedicas)
  @JoinColumn({
    name: "doctor_id",
    referencedColumnName: "id"
  })
  doctor: Doctor;

  @Column({
    type: "int",
    name: "paciente_id",
    default: null
  })
  pacienteId: number;

  @ManyToOne(() => Paciente, paciente => paciente.citasMedicas)
  @JoinColumn({
    name: "paciente_id",
    referencedColumnName: "id"
  })
  paciente: Paciente;

  @Column({
    length: 64
  })
  especialidad: string;

  @Column({
    name: 'fecha',
    type: 'date'
  })
  fecha_atencion: string;

  @Column({
    type: 'int'
  })
  hora_inicio: number;

  @Column({
    type: 'int'
  })
  hora_fin: number;
}