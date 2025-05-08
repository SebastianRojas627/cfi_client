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
} from "@mui/material";
import { SolicitudInformacion, TipoSujeto } from "../api/types";
import { getSolicitudById } from "../api/solicitudService";

interface Props {
  solicitudId: string;
}

const SolicitudDetail: React.FC<Props> = ({ solicitudId }) => {
  const [solicitud, setSolicitud] = useState<SolicitudInformacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        setLoading(true);
        const data = await getSolicitudById(solicitudId);
        setSolicitud(data);
        console.log(data);
      } catch (err: any) {
        setError("No se pudo cargar la solicitud.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [solicitudId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!solicitud) return null;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Detalles del Caso #{solicitud.numero_caso}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>
            <strong>Delito:</strong> {solicitud.delito}
          </Typography>
          <Typography>
            <strong>Investigador:</strong> {solicitud.investigador}
          </Typography>
          <Typography>
            <strong>Unidad Investigativa:</strong>{" "}
            {solicitud.unidad_investigativa}
          </Typography>
          <Typography>
            <strong>Número de Caso Unidad:</strong>{" "}
            {solicitud.numero_caso_unidad}
          </Typography>
          <Typography>
            <strong>Fecha Solicitud:</strong>{" "}
            {new Date(solicitud.fecha_solicitud).toLocaleDateString()}
          </Typography>
          <Typography>
            <strong>Completado:</strong> {solicitud.completado ? "Sí" : "No"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle1" gutterBottom>
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
                  <TableCell>IMPUESTOS</TableCell>
                  <TableCell>
                    {solicitud.sistemas.impuestos ? "✔️ Sí" : "❌ No"}
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

      <Typography variant="h6" gutterBottom>
        Sujetos Relacionados
      </Typography>
      {solicitud.sujetos.map((sujeto, idx) => (
        <Box key={idx} sx={{ mb: 2, pl: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Sujeto #{idx + 1} (
            {sujeto.tipo === TipoSujeto.PERSONA ? "Persona" : "Vehículo"})
          </Typography>
          <Grid container spacing={2}>
            {sujeto.tipo === TipoSujeto.PERSONA ? (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography>
                    <strong>Nombres:</strong> {sujeto.nombres}
                  </Typography>
                  <Typography>
                    <strong>Apellido Paterno:</strong> {sujeto.apellido_paterno}
                  </Typography>
                  <Typography>
                    <strong>Apellido Materno:</strong> {sujeto.apellido_materno}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography>
                    <strong>CI:</strong> {sujeto.ci}
                  </Typography>
                  <Typography>
                    <strong>Complemento:</strong> {sujeto.complemento || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {sujeto.fecha_nacimiento
                      ? new Date(sujeto.fecha_nacimiento).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Grid>
              </>
            ) : (
              <Grid size={{ xs: 12 }}>
                <Typography>
                  <strong>Placa del Vehículo:</strong> {sujeto.placa}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default SolicitudDetail;
