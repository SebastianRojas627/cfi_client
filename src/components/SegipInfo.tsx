import { Box, Divider, Grid, Typography } from "@mui/material";
import { RespuestaSegip } from "../api/types";

export const SegipInfo = ({ segip }: { segip: RespuestaSegip }) => {
  if (!segip) return null;

  const nombreCompleto = `${segip.Nombres ?? ""} ${
    segip.PrimerApellido ?? ""
  } ${segip.SegundoApellido ?? ""}`.trim();
  const conyuge =
    segip.NombreCompletoConyuge?.trim() === "--" || !segip.NombreCompletoConyuge
      ? "No tiene"
      : segip.NombreCompletoConyuge;

  return (
    <Box mb={4}>
      {segip.Fotografia && (
        <Box
          component="img"
          src={segip.Fotografia}
          alt="Imagen del sujeto"
          sx={{
            width: "100%",
            maxHeight: 250,
            objectFit: "contain",
            borderRadius: 1,
            display: "block",
            mb: 3,
          }}
        />
        /*
        <Box
          component="img"
          src={segip.Fotografia}
          alt="Imagen del sujeto"
          sx={{
            width: "auto",
            maxWidth: "100%",
            maxHeight: 250,
            height: "auto",
            objectFit: "contain",
            borderRadius: 1,
            display: "block",
            mb: 3,
            mx: "auto",
          }}
        />
        */
      )}

      <Typography color="text.primary" variant="h5" gutterBottom>
        <strong>Información SEGIP</strong>
      </Typography>
      <Typography color="text.primary" variant="h6" gutterBottom>
        <strong>Información del ciudadano</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography color="text.primary">
            <strong>Nombre Completo:</strong> {nombreCompleto || "—"}
          </Typography>
          <Typography color="text.primary">
            <strong>Procedencia:</strong> {segip.ProcedenciaRegistro || "—"}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography color="text.primary">
            <strong>Fecha de Nacimiento:</strong> {segip.FechaNacimiento || "—"}
          </Typography>
          <Typography color="text.primary">
            <strong>Tipo de Registro:</strong> {segip.TipoRegistro || "—"}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          <strong>Información Complementaria</strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Domicilio:</strong> {segip.Domicilio || "—"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Profesión / Ocupación:</strong>{" "}
              {segip.ProfesionOcupacion || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Estado Civil:</strong> {segip.EstadoCivil || "—"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          <strong>Información de Relación Familiar</strong>
        </Typography>
        <Typography color="text.primary">
          <strong>Nombre Cónyuge:</strong> {conyuge}
        </Typography>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box mt={3}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          <strong>Lugar de Nacimiento</strong>
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>País:</strong> {segip.LugarNacimientoPais || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Provincia:</strong>{" "}
              {segip.LugarNacimientoProvincia || "—"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="text.primary">
              <strong>Departamento:</strong>{" "}
              {segip.LugarNacimientoDepartamento || "—"}
            </Typography>
            <Typography color="text.primary">
              <strong>Localidad:</strong>{" "}
              {segip.LugarNacimientoLocalidad || "—"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
