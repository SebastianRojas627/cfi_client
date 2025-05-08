import { solicitudesClient } from "./apiClient";

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
