export type Subject = {
  tipo: "persona" | "vehiculo";
  nombres?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  ci?: string;
  placa?: string;
};

export type Services = {
  segip: boolean;
  sinarap: boolean;
  itv: boolean;
};

export type SolicitudInformacion = {
  numero_caso: number;
  investigador: string;
  sujetos: Subject[];
  unidad_policial: string;
  sistemas: Services;
};
