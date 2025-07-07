import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RespuestaItv } from "../api/types";

export const ItvInfo = ({ itv }: { itv: RespuestaItv }) => {
  if (!itv) return null;

  const datos = itv.datos_tecnicos;

  return (
    <Box mb={4}>
      {datos?.fotografia && (
        <Box
          component="img"
          src={datos.fotografia}
          alt="Fotografía del vehículo"
          sx={{
            width: "100%",
            maxHeight: 250,
            objectFit: "contain",
            borderRadius: 1,
            display: "block",
            mb: 3,
          }}
        />
      )}

      <Typography color="text.primary" variant="h6" gutterBottom>
        <strong>Información Técnica del Vehículo</strong>
      </Typography>

      <Box mt={2}>
        <Typography color="text.primary" variant="subtitle1" gutterBottom>
          <strong>Información General</strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Placa:</strong> {datos?.placa || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Marca:</strong> {datos?.marca || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Modelo:</strong> {datos?.modelo || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Color:</strong> {datos?.color || "—"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Clase:</strong> {datos?.clase || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Tipo de Vehículo:</strong> {datos?.tipo_vehiculo || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Servicio:</strong> {datos?.servicio || "—"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography color="text.primary" variant="subtitle1" gutterBottom>
          <strong>Características Técnicas</strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Motor:</strong> {datos?.motor || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Chasis:</strong> {datos?.chasis || "—"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Cilindrada:</strong> {datos?.cilindrada ?? "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Radicatoria:</strong> {datos?.radicatoria || "—"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography color="text.primary" variant="subtitle1" gutterBottom>
          <strong>Información Legal</strong>
        </Typography>
        <Typography color="text.primary">
          <strong>Industria:</strong> {datos?.industria || "—"}
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          <strong>Propietarios Registrados</strong>
        </Typography>

        {itv.personas?.map((owner: any, index: number) => {
          const nombreCompleto = `${owner.nombre ?? ""} ${
            owner.paterno ?? ""
          } ${owner.materno ?? ""}`.trim();
          const titulo = `${owner.nro_documento} – ${owner.gestion} – ${nombreCompleto}`;

          return (
            <Accordion key={owner.owner_itv_id || index} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color="text.primary">
                  <strong>{titulo}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {owner.fotografia && (
                  <Box
                    component="img"
                    src={owner.fotografia}
                    alt="Fotografía del propietario"
                    sx={{
                      width: "100%",
                      maxHeight: 250,
                      objectFit: "contain",
                      borderRadius: 1,
                      display: "block",
                      mb: 2,
                    }}
                  />
                )}

                <Typography
                  color="text.primary"
                  variant="subtitle1"
                  gutterBottom
                >
                  <strong>Información Personal</strong>
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.primary">
                      <strong>Nombre:</strong> {nombreCompleto || "—"}
                    </Typography>
                    <Typography color="text.primary">
                      <strong>Sexo:</strong> {owner.sexo || "—"}
                    </Typography>
                    <Typography color="text.primary">
                      <strong>Fecha de Nacimiento:</strong>{" "}
                      {owner.fecha_nacimiento || "—"}
                    </Typography>
                    <Typography color="text.primary">
                      <strong>Expedición:</strong> {owner.expedicion || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.primary">
                      <strong>Documento Complemento:</strong>{" "}
                      {owner.documento_complemento || "—"}
                    </Typography>
                    <Typography color="text.primary">
                      <strong>Nro. Celular:</strong> {owner.nro_celular || "—"}
                    </Typography>
                    <Typography color="text.primary">
                      <strong>Email:</strong> {owner.email || "—"}
                    </Typography>
                  </Grid>
                  <Divider />
                </Grid>

                <Divider sx={{ mt: 3 }} />

                <Box mt={3}>
                  <Typography
                    color="text.primary"
                    variant="subtitle1"
                    gutterBottom
                  >
                    <strong>Licencia y Registro</strong>
                  </Typography>
                  <Typography color="text.primary">
                    <strong>Categoría de Licencia:</strong>{" "}
                    {owner.categoria_licencia || "—"}
                  </Typography>
                  <Typography color="text.primary">
                    <strong>Gestión:</strong> {owner.gestion || "—"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
};
