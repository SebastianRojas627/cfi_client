import { solicitudesClient } from "./apiClient";

export const getSolicitudes = async () => {
    const response = await solicitudesClient.get('/solicitud-informacion');
    return response.data;
  };