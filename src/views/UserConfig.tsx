import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import { useAuth } from "../hooks/useAuth";

export const UserConfigView = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            src={user?.imageUser}
            alt="Foto del usuario"
            sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
          />
          <Typography variant="h6">{user?.fullName}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontWeight: 500 }}
          >
            {user?.userName}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Información Institucional</strong>
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#6EBE40",
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>Nombre Completo:</strong> {user?.fullName}
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#6EBE40",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>Correo institucional:</strong> {user?.email}
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Organización Policial */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Organización Policial</strong>
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Box display="flex" alignItems="center" mb={1}>
                <DomainIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="body2">
                  <strong>Nombre completo:</strong> {user?.organismoFullName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <DomainIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="body2">
                  <strong>Abreviación:</strong> {user?.organismoAbreviacion}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/*<Card>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Configuración de la cuenta</strong>
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <FormControlLabel
            control={<Switch checked={false} />}
            label="Recibir notificaciones al correo institucional"
          />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Notifica al correo del usuario que una nueva solicitud de informacion ha sido llenada.
            </Typography>
          </Box>
        </CardContent>
      </Card>
      */}
    </Box>
  );
};
