interface ResponseHorarios {
  horaInicio: string;
  horaFin: string;
}

interface ResponseFechasDisponibles {
  fecha: string;
  horarios: ResponseHorarios[];
}

export interface ResponseByEspecialidadAndFecha {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  fechasDisponibles: ResponseFechasDisponibles[];
}
