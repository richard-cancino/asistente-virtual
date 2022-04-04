import { Paciente } from '@data/entities';
import { CitaMedica } from '@data/entities';
export class GetPacienteDto {
  constructor(
    private readonly id: number,
    private readonly codigoConadis: string,
    private readonly nombres: string,
    private readonly apellidos: string,
    private readonly telefono: string,
    private readonly direccion: string,
    private readonly fechaNacimiento: string,
    private readonly citasMedicas: CitaMedica[],
  ) {}

  static from(entity: Paciente) {
    return new GetPacienteDto(
      entity.id,
      entity.codigoConadis,
      entity.nombres,
      entity.apellidos,
      entity.telefono,
      entity.direccion,
      entity.fechaNacimiento,
      entity.citasMedicas,
    )
  }

  static fromMany(pacientes: Paciente[], count: number): [GetPacienteDto[], number] {
    const docs: GetPacienteDto[] = pacientes.map(paciente => GetPacienteDto.from(paciente));
    return [
      docs,
      count
    ]
  }
}