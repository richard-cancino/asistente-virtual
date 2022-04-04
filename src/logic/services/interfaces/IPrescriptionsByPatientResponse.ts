interface DoctorResponse {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
}

export interface PrescriptionsByPatientResponse {
  id: number;
  fecha: string;
  doctor: DoctorResponse;
}
