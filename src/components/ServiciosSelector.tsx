import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { SolicitudInformacion, SistemasSolicitados } from "../api/types";
import { servicios } from "../utils/serviceInfo";

interface ServicioSelectorProps {
  register: UseFormRegister<SolicitudInformacion>;
  watch: UseFormWatch<SolicitudInformacion>;
  setValue: UseFormSetValue<SolicitudInformacion>;
  errors: FieldErrors<SolicitudInformacion>;
}

export const ServicioSelector = ({
  watch,
  setValue,
  errors,
}: ServicioSelectorProps) => {
  const sistemas = watch("sistemas");

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Seleccione los servicios que desea consultar
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(servicios).map(([key, { label, description }]) => {
          const typedKey = key as keyof SistemasSolicitados;

          return (
            <Grid size={{ xs: 12, md: 6 }} key={typedKey}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sistemas?.[typedKey] || false}
                      onChange={(e) =>
                        setValue(`sistemas.${typedKey}`, e.target.checked)
                      }
                    />
                  }
                  label={`Incluir ${label}`}
                />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {errors.sistemas && (
        <Typography color="error" mt={2}>
          {errors.sistemas.message}
        </Typography>
      )}
    </Box>
  );
};
