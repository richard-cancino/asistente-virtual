interface PatientResponse {
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  codigoConadis: string;
  token: string;
}

export interface AuthResponse {
  success: boolean;
  data?: PatientResponse;
  message?: string;
}
