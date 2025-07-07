export interface SolicitudInformacion {
  solicitud_informacion_id: string;
  numero_caso: number;
  delito: string;
  investigador: string;
  analista_cfi: string;
  numero_copias: number;
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
  sinarap: boolean;
  anh: boolean;
}

export interface SujetoBusqueda {
  tipo: TipoSujeto;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  ci: string;
  complemento: string;
  placa: string;
  carguio_combustible: boolean;
  fechaini: Date | null;
  fechafin: Date | null;
}

export interface ObjetoBusqueda {
  numero_caso: number;
  investigador: string;
  sujetos: SujetoBusqueda[];
  sistemas: SistemasSolicitados;
}

export interface ResultadoBusqueda {
  numero_caso: number;
  results: RespuestaSujeto[];
}

export interface ResultadosSolicitudCompleta {
  solicitud_informacion_id: string;
  numero_caso: number;
  results: RespuestaSujeto[];
}

export enum TipoSujeto {
  PERSONA = "persona",
  VEHICULO = "vehiculo",
}

export interface RespuestaSujeto {
  tipo: TipoSujeto;
  sujeto: number;
  ci?: string;
  placa?: string;

  segip?: RespuestaSegip;

  sinarap?: RespuestaSinarap;

  itv?: RespuestaItv;

  anh?: RespuestaAnh;
}

export interface GenerateReport {
  usuario_id: string;
  numero_caso: number;
  justificacion: string;
}

export interface OwnerItv {
  categoria_licencia: string;
  documento_complemento: string;
  email: string;
  expedicion: string;
  fecha_nacimiento: string;
  fotografia: string;
  gestion: string;
  materno: string;
  nombre: string;
  nro_celular: string;
  nro_documento: string;
  owner_itv_id: string;
  paterno: string;
  sexo: string;
}

export interface RespuestaSegip {
  Fotografia: string;
  id: string;
  Complemento: string;
  Domicilio: string;
  EstadoCivil: string;
  FechaNacimiento: string;
  LugarNacimientoDepartamento: string;
  LugarNacimientoLocalidad: string;
  LugarNacimientoPais: string;
  LugarNacimientoProvincia: string;
  NombreCompletoConyuge: string;
  NombreCompletoMadre: string;
  NombreCompletoPadre: string;
  NumeroDocumento: string;
  ProcedenciaRegistro: string;
  Nombres: string;
  PrimerApellido: string;
  ProfesionOcupacion: string;
  SegundoApellido: string;
  ComplementoVisible: string;
  TipoRegistro: string;
  Genero: string;
  Nacionalidad: string;
  GrupoSanguineo: string;
  LugarExpedicion: string;
}

export interface DatosTecnicosItv {
  placa: string;
  marca: string;
  modelo: string;
  industria: string;
  clase: string;
  servicio: string;
  tipo_vehiculo: string;
  color: string;
  cilindrada: number;
  chasis: string;
  motor: string;
  radicatoria: string;
  fotografia: string;
}

export interface VehiculoAnh {
  identificadorAnh: string;
  chasis: string;
  placa: string;
  copiaPlaca: string;
  clase: string;
  marca: string;
  color: string;
  servicio: string;
  categoria: string;
  propietario: string;
  entidad: string;
  lugarRegistro: string;
  fechaRegistro: Date;
  fotoFrontal: string;
  fotoLateral: string;
  fotoPlaca: string;
  fotoTerceraPlaca: string;
  fotoChasis: string;
  fotoLicencia: string;
}

export interface CargaAnh {
  estacionServicio: string;
  nitEstacion: string;
  departamento: string;
  productor: string;
  razonSocial: string;
  nitConsumidor: string;
  factura: string;
  nroAutorizacion: string;
  codigoControl: string;
  cantidadLitros: number;
  monto: number;
  fechaVenta: Date;
  placa: string;
}

export interface RespuestaItv {
  datos_tecnicos?: DatosTecnicosItv;
  personas?: OwnerItv[];
}

export interface RespuestaAnh {
  vehiculo?: VehiculoAnh;
  cargas_combustible?: CargaAnh;
}

export interface ConteoSolicitudes {
  completadas: number;
  pendientes: number;
  totales: number;
}

export interface CalendarioCount {
  fecha: Date;
  cantidad: Number;
}

export interface RespuestaSinarap {
  numero_documento: string;
  complemento: string;
  nombres: string;
  paterno: string;
  materno?: string;
  fecha_nacimiento: Date;
  antecedentes: Antecedente[];
}

export interface Antecedente {
  fuente: "FELCC" | "FELCN" | "TRANSITO";
  hecho: string | null;
  detalle: string | null;
  fecha: Date | null;
}

export interface TableRequest {
  pageSize: number;
  page: number;
  sortBy: string | null;
  order: string | null;
  usuario: string | null;
  solicitud_informacion_id: string | null;
}

export interface Reporte {
  doc_log_id: string;
  usuario_id: string;
  solicitud_informacion_id: string;
  numero_copia: number;
  fecha_generacion: Date;
  justificacion: string;
  solicitud_informacion: SolicitudInformacion;
  rowNumber: number;
}

export interface MetaData {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RespuestaReporte {
  data: Reporte[];
  meta: MetaData
}
