import searchClient from "./apiClient";
import { RespuestaSujeto } from "./types";

export const getReport = async (request: RespuestaSujeto[]) => {
  const response = await searchClient.post(
    "http://localhost:5002/files/generate",
    request,
    {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }
  );
  return response.data;
};
