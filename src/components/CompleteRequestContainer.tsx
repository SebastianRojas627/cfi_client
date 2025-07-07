import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompleteRequestForm from "./CompleteRequestForm";
import {
  SistemasSolicitados,
  SolicitudInformacion,
  SujetoBusqueda,
} from "../api/types";
import {
  getSolicitudById,
  getPendingSolicitudes,
} from "../api/solicitudService";

const CompleteRequestContainer: React.FC = () => {
  const { solicitudId } = useParams();
  const [solicitudSeleccionadaId, setSolicitudSeleccionadaId] = useState<
    string | null
  >(solicitudId || null);

  const [numero_caso, setCaseNumber] = useState(0);
  const [servicios, setServicios] = useState<SistemasSolicitados>({
    segip: false,
    sinarap: false,
    itv: false,
    anh: false,
  });
  const [sujetos, setSujetos] = useState<SujetoBusqueda[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudInformacion[]>([]);
  const [investigador, setInvestigador] = useState("");
  const [delito, setDelito] = useState("");
  const [unidad_investigativa, setUnidadInvestigativa] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getPendingSolicitudes();
        setSolicitudes(data);
      } catch (err) {
        console.error("Error fetching pending solicitudes:", err);
      }
    };

    fetchSolicitudes();
  }, [solicitudId]);

  useEffect(() => {
    const fetchSelectedSolicitud = async () => {
      if (!solicitudSeleccionadaId) return;

      try {
        setLoading(true);
        const solicitud = await getSolicitudById(solicitudSeleccionadaId);
        setCaseNumber(solicitud.numero_caso.toString());
        setServicios(solicitud.sistemas);
        setSujetos(solicitud.sujetos);
        setInvestigador(solicitud.investigador);
        setDelito(solicitud.delito);
        setUnidadInvestigativa(solicitud.unidad_investigativa);
      } catch (err) {
        console.error("Error fetching solicitud by ID:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedSolicitud();
  }, [solicitudSeleccionadaId]);

  const handleSolicitudChange = (newSolicitudId: string) => {
    setSolicitudSeleccionadaId(newSolicitudId);
    navigate(`/complete/${newSolicitudId}`);
  };

  return (
    <Box>
      <>
        <Typography color='text.primary' variant="h6" sx={{ mb: 2 }}>
          Seleccione una solicitud pendiente:
        </Typography>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="select-request-label">Solicitud</InputLabel>
          <Select
            labelId="select-request-label"
            value={solicitudSeleccionadaId || ""}
            label="Solicitud"
            onChange={(e) => handleSolicitudChange(e.target.value)}
          >
            {solicitudes.map((req) => (
              <MenuItem
                key={req.solicitud_informacion_id}
                value={req.solicitud_informacion_id}
              >
                {`Caso ${req.numero_caso} - ${req.investigador} (${req.unidad_investigativa})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>

      {solicitudSeleccionadaId && loading && (
        <Box sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {solicitudSeleccionadaId && !loading && (
        <CompleteRequestForm
          solicitud_id={solicitudId!}
          numero_caso={numero_caso}
          sistemas={servicios}
          sujetos={sujetos}
          investigador={investigador}
          delito={delito}
          unidad_investigativa={unidad_investigativa}
        />
      )}
    </Box>
  );
};

export default CompleteRequestContainer;
