import { SistemasSolicitados } from "../api/types";

export const getSelectedServiceTypes = (sistemas: Partial<SistemasSolicitados>) => {
  const selectedKeys = Object.entries(sistemas)
    .filter(([, selected]) => selected)
    .map(([key]) => key);

  const personaServices = ["segip", "sinarap"];
  const vehiculoServices = ["itv", "anh"];

  const personaEnabled = selectedKeys.some((k) => personaServices.includes(k));
  const vehiculoEnabled = selectedKeys.some((k) => vehiculoServices.includes(k));
  const anhSelected = selectedKeys.includes("anh");

  return { selectedKeys, personaEnabled, vehiculoEnabled, anhSelected };
};
