import { Horario } from "@data/entities/horario.entity";
export function transformHHMM(horarios: [Horario[], number]): void {
  horarios![0].forEach((horario) => {
    const horaInicio = (horario.hora_inicio / 60).toString();
    const horaFin = (horario.hora_fin / 60).toString();

    const [base_time_inicio, base_time_fin] = transformLogic(horaInicio, horaFin);

    horario.hora_inicio_fix = base_time_inicio;
    horario.hora_fin_fix = base_time_fin;
  });
}

export function transformHHMMSingle(
  hora_inicio: number,
  hora_fin: number,
): [string, string] {
  const horaInicio = (hora_inicio / 60).toString();
  const horaFin = (hora_fin / 60).toString();

  return transformLogic(horaInicio, horaFin);
}

function transformLogic(horaInicio: string, horaFin: string): [string, string] {
  let base_time_inicio = "00:00";
  let base_time_fin = "00:00";

  switch (horaInicio.length) {
    case 1:
      base_time_inicio = `0${horaInicio}:00`;
      break;
    case 2:
      base_time_inicio = horaInicio + base_time_inicio.slice(2);
      break;
    case 3:
      base_time_fin = "0" + horaFin.slice(0, -2) + base_time_fin.slice(2);
      base_time_fin = base_time_fin.slice(0, -2) + horaFin.slice(2) + "0";
      break;
    case 4:
      base_time_inicio = horaInicio.slice(0, -2) + base_time_inicio.slice(2);
      base_time_inicio =
        base_time_inicio.slice(0, -2) + horaInicio.slice(3) + "0";
      break;
  }

  switch (horaFin.length) {
    case 1:
      base_time_inicio = `0${horaInicio}:"00"`;
      break;
    case 2:
      base_time_fin = horaFin + base_time_fin.slice(2);
      break;
    case 3:
      base_time_fin = "0" + horaFin.slice(0, -2) + base_time_fin.slice(2);
      base_time_fin = base_time_fin.slice(0, -2) + horaFin.slice(2) + "0";
      break;
    case 4:
      base_time_fin = horaFin.slice(0, -2) + base_time_fin.slice(2);
      base_time_fin = base_time_fin.slice(0, -2) + horaFin.slice(3) + "0";
      break;
  }

  return [base_time_inicio, base_time_fin]
}