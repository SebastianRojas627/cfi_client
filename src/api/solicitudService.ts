import { solicitudesClient } from "./apiClient";
import {
  CalendarioCount,
  ConteoSolicitudes,
  GenerateReport,
  RespuestaReporte,
  ResultadoBusqueda,
  ResultadosSolicitudCompleta,
  SolicitudInformacion,
  TableRequest,
  UserNotification,
} from "./types";

export const getSolicitudes = async (offset: number, limit: number) => {
  const response = await solicitudesClient.get("/solicitud-informacion", {
    params: { limit, offset },
  });
  return response.data;
};

export const getSolicitudById = async (id: string) => {
  const response = await solicitudesClient.get(`/solicitud-informacion/${id}`);
  return response.data;
};

export const getPendingSolicitudes = async () => {
  const response = await solicitudesClient.get(
    "/solicitud-informacion/pending"
  );
  return response.data;
};

export const getSolicitudesCount = async () => {
  const response = await solicitudesClient.get<ConteoSolicitudes>(
    "/solicitud-informacion/count"
  );
  return response.data;
};

export const ultimasSolicitues = async () => {
  const response = await solicitudesClient.get<SolicitudInformacion[]>(
    "/solicitud-informacion/last"
  );
  return response.data;
};

export const getCalendarCount = async (periodo: "week" | "month" | "year") => {
  const response = await solicitudesClient.get<CalendarioCount[]>(
    `/solicitud-informacion/calendar/${periodo}`
  );
  return response.data;
};

export const getRequest = async (request: any) => {
  const response = await solicitudesClient.post<ResultadoBusqueda>(
    "/respuestas",
    request
  );
  return response.data;
};

export const resolverBusquedaLibre = async (request: SolicitudInformacion) => {
  const response = await solicitudesClient.post<ResultadoBusqueda>(
    "/respuestas/libre",
    request
  );
  return response.data;
};

export const getResultadosSolicitudCompleta = async (solicitud_informacion_id: string) => {
  const response = await solicitudesClient.get<ResultadosSolicitudCompleta>(
    `/respuestas/${solicitud_informacion_id}`
  );
  return response.data;
};

export const getGeneratedReport = async (
  generateReportRequest: GenerateReport
) => {
  const response = await solicitudesClient.post(
    "/doc-logs",
    generateReportRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      timeout: 5000000,
    }
  );
  return response.data;
};

export const getReportes = async (query: TableRequest) => {
  const response = await solicitudesClient.post<RespuestaReporte>("/doc-logs/logs", query);
  return response.data;
};

export const getReportesSolicitud = async (offset: number, limit: number) => {
  const response = await solicitudesClient.get("/solicitud-informacion", {
    params: { limit, offset },
  });
  return response.data;
};

export const getUserNotifications = async (user_id: string) => {
  const response = await solicitudesClient.get<UserNotification[]>(`/notifications/${user_id}`);
  return response.data;
};

export const markNotificationComplete = async (notification_id: number) => {
  const response = await solicitudesClient.get<UserNotification[]>(`/notifications/complete/${notification_id}`);
  return response.data;
};
