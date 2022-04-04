interface ProductResponse {
  nombre: string;
  indicacion: string;
}

export interface PrescriptionDetailResponse {
  id: number;
  fecha: string;
  productos: ProductResponse[];
}
