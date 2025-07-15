import { SistemasSolicitados } from "../api/types";

export const servicios: Record<keyof SistemasSolicitados, { label: string; description: string }> = {
  segip: {
    label: "SEGIP",
    description: "Información civil de personas (CI, nombres, apellidos, etc.)",
  },
  sinarap: {
    label: "SINARAP",
    description: "Antecedentes policiales y registros criminales.",
  },
  itv: {
    label: "ITV",
    description: "Información técnica de vehículos (placa, marca, etc.)",
  },
  // anh: {
  //   label: "ANH",
  //   description: "Carguío de combustible y otros datos de la Agencia Nacional de Hidrocarburos.",
  // },
};
