import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SubjectForm from "./SubjectForm";
import { SistemasSolicitados, SujetoBusqueda, TipoSujeto } from "../api/types";
import ServiceSelector from "./ServicesSelector";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../api/solicitudService";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface CompleteRequestFormProps {
  solicitud_id: string;
  numero_caso: number;
  sistemas: SistemasSolicitados;
  sujetos: SujetoBusqueda[];
  investigador: string;
  delito: string;
  unidad_investigativa: string;
}

const CompleteRequestForm: React.FC<CompleteRequestFormProps> = ({
  solicitud_id,
  numero_caso,
  sistemas,
  sujetos,
  investigador,
  delito,
  unidad_investigativa,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const personas = sujetos.filter((s) => s.tipo === TipoSujeto.PERSONA);
  const vehiculos = sujetos.filter((s) => s.tipo === TipoSujeto.VEHICULO);
  const navigate = useNavigate();

  const renderSubjects = (list: typeof sujetos, startIndex = 0) =>
    list.map((sujeto, idx) => (
      <Grid size={{ xs: 12, lg: 6 }} key={startIndex + idx}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          Sujeto {startIndex + idx + 1} - {sujeto.tipo}
        </Typography>
        <SubjectForm subject={sujeto} readonly />
      </Grid>
    ));

  const handleSearchConfirm = async () => {
    setConfirmOpen(false);
    setLoading(true);
    try {
      const request = { numero_caso, investigador, sistemas, sujetos };
      const response = await getRequest(request);

      navigate(`/results/${solicitud_id}`, { state: { results: response } });
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  const handleSearch = () => {
    setConfirmOpen(true);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <Box>
      <Typography color="text.primary" variant="h5" gutterBottom sx={{ mb: 2 }}>
        Completar Solicitud de Información
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Número de Caso"
            fullWidth
            value={numero_caso}
            sx={{ mb: 2 }}
            disabled
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Investigador"
            fullWidth
            value={investigador}
            sx={{ mb: 2 }}
            disabled
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Delito"
            fullWidth
            value={delito}
            sx={{ mb: 2 }}
            disabled
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Unidad Investigativa"
            fullWidth
            value={unidad_investigativa}
            sx={{ mb: 2 }}
            disabled
          />
        </Grid>
      </Grid>

      <Typography color="text.primary" variant="subtitle1" sx={{ mb: 1 }}>
        Servicios Solicitados:
      </Typography>
      <ServiceSelector sistemas={sistemas} readonly />

      <Typography
        color="text.primary"
        variant="subtitle1"
        sx={{ mt: 4, mb: 2 }}
      >
        Sujetos Relacionados:
      </Typography>
      <Grid container spacing={2}>
        {renderSubjects(personas)}
        {renderSubjects(vehiculos, personas.length)}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Realizar Búsqueda
        </Button>
      </Box>

      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Confirmar búsqueda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea realizar la búsqueda con los datos
            ingresados?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button
            onClick={handleSearchConfirm}
            color="primary"
            autoFocus
            disabled={loading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(111, 111, 111, 0.8)"
          zIndex={1300}
          flexDirection="column"
        >
          <CircularProgress />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Buscando...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CompleteRequestForm;
