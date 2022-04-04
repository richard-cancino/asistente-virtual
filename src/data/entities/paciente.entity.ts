import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { RecetaMedica } from './receta_medica.entity';
import { CitaMedica } from './cita_medica.entity';

@Entity({
  name: 'pacientes',
})
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'codigo_conadis',
    length: 64,
  })
  codigoConadis: string;

  @Column({
    length: 64,
  })
  password: string;

  @Column({
    length: 64,
  })
  nombres: string;

  @Column({
    length: 64,
  })
  apellidos: string;

  @Column({
    length: 64,
  })
  telefono: string;

  @Column({
    length: 64,
  })
  direccion: string;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date',
  })
  fechaNacimiento: string;

  @OneToMany(() => CitaMedica, (citaMedica) => citaMedica.paciente)
  citasMedicas: CitaMedica[];

  @OneToMany(() => RecetaMedica, (recetasMedica) => recetasMedica.paciente)
  recetasMedicas: RecetaMedica[];
}
