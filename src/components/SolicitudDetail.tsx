import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { SolicitudInformacion, TipoSujeto } from "../api/types";
import { getSolicitudById } from "../api/solicitudService";
import { useNavigate } from "react-router";

interface Props {
  solicitudId: string;
}

const SolicitudDetail: React.FC<Props> = ({ solicitudId }) => {
  const [solicitud, setSolicitud] = useState<SolicitudInformacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        setLoading(true);
        const data = await getSolicitudById(solicitudId);
        setSolicitud(data);
      } catch (err: any) {
        setError("No se pudo cargar la solicitud.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [solicitudId]);

  const handleRedirect = async () => {
    navigate(`/complete/${solicitudId}`);
  };

  const mostrarCarga = solicitud?.sistemas.anh;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!solicitud) return null;

  return (
    <Box p={3}>
      <Typography color='text.primary' variant="h5" gutterBottom>
        Detalles del Caso #{solicitud.numero_caso}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography color='text.primary'>
            <strong>Delito:</strong> {solicitud.delito}
          </Typography>
          <Typography color='text.primary'>
            <strong>Investigador:</strong> {solicitud.investigador}
          </Typography>
          <Typography color='text.primary'>
            <strong>Unidad Investigativa:</strong>{" "}
            {solicitud.unidad_investigativa}
          </Typography>
          <Typography color='text.primary'>
            <strong>Número de Caso Unidad:</strong>{" "}
            {solicitud.numero_caso_unidad}
          </Typography>
          <Typography color='text.primary'>
            <strong>Fecha Solicitud:</strong>{" "}
            {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
          </Typography>
          <Typography color='text.primary'>
            <strong>Completado:</strong> {solicitud.completado ? "Sí" : "No"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography color='text.primary' variant="subtitle1" gutterBottom>
            <strong>Sistemas Solicitados:</strong>
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>SEGIP</TableCell>
                  <TableCell>
                    {solicitud.sistemas.segip ? "✔️ Sí" : "❌ No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ITV</TableCell>
                  <TableCell>
                    {solicitud.sistemas.itv ? "✔️ Sí" : "❌ No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ANH</TableCell>
                  <TableCell>
                    {solicitud.sistemas.anh ? "✔️ Sí" : "❌ No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SINARAP</TableCell>
                  <TableCell>
                    {solicitud.sistemas.sinarap ? "✔️ Sí" : "❌ No"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography color='text.primary' variant="h6" gutterBottom>
        Sujetos Relacionados
      </Typography>
      {solicitud.sujetos.map((sujeto, idx) => (
        <Box key={idx} sx={{ mb: 2, pl: 2 }}>
          <Typography color='text.primary' variant="subtitle1" gutterBottom>
            Sujeto #{idx + 1} (
            {sujeto.tipo === TipoSujeto.PERSONA ? "Persona" : "Vehículo"})
          </Typography>
          <Grid container spacing={2}>
            {sujeto.tipo === TipoSujeto.PERSONA ? (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color='text.primary'>
                    <strong>Nombres:</strong> {sujeto.nombres}
                  </Typography>
                  <Typography color='text.primary'>
                    <strong>Apellido Paterno:</strong> {sujeto.apellido_paterno}
                  </Typography>
                  <Typography color='text.primary'>
                    <strong>Apellido Materno:</strong> {sujeto.apellido_materno}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography color='text.primary'>
                    <strong>CI:</strong> {sujeto.ci}
                  </Typography>
                  <Typography color='text.primary'>
                    <strong>Complemento:</strong> {sujeto.complemento || "N/A"}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography color='text.primary'>
                    <strong>Placa del Vehículo:</strong> {sujeto.placa}
                  </Typography>
                  {mostrarCarga && (
                    <Typography color='text.primary'>
                      <strong>Datos de Carga:</strong>{" "}
                      {sujeto.carguio_combustible ? "✔️ Sí" : "❌ No"}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  {sujeto.carguio_combustible && (
                    <>
                      <Typography color='text.primary'>
                        <strong>Fecha Inicial</strong> {String(sujeto.fechafin)}
                      </Typography>

                      <Typography color='text.primary'>
                        <strong>Fecha Final</strong> {String(sujeto.fechafin)}
                      </Typography>
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Realizar Búsqueda
        </Button>
      </Box>
    </Box>
  );
};

export default SolicitudDetail;
