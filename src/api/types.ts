export interface SolicitudInformacion {
  solicitud_informacion_id: string;
  numero_caso: number;
  delito: string;
  investigador: string;
  unidad_investigativa: string;
  numero_caso_unidad: string;
  sujetos: SujetoBusqueda[];
  sistemas: SistemasSolicitados;
  fecha_solicitud: Date;
  completado: boolean;
}

export interface SistemasSolicitados {
  segip: boolean;
  itv: boolean;
  impuestos: boolean;
  sinarap: boolean;
}

export enum TipoSujeto {
  PERSONA = "persona",
  VEHICULO = "vehiculo",
}

export interface SujetoBusqueda {
  tipo: TipoSujeto;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  ci: string;
  complemento: string;
  fecha_nacimiento: Date | null;
  placa: string;
}

export interface ObjetoBusqueda {
  numero_caso: number;
  investigador: string;
  sujetos: SujetoBusqueda[];
  sistemas: SistemasSolicitados;
}
