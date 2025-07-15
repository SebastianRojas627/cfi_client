import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { SolicitudInformacion, TipoSujeto } from "../api/types";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";

interface SujetoFormProps {
  index: number;
  field: FieldArrayWithId<SolicitudInformacion, "sujetos", "id">;
  remove: (index: number) => void;
  register: UseFormRegister<SolicitudInformacion>;
  errors: FieldErrors<SolicitudInformacion>;
  setValue: UseFormSetValue<SolicitudInformacion>;
  watch: UseFormWatch<SolicitudInformacion>;
  personaEnabled: boolean;
  vehiculoEnabled: boolean;
  anhSelected: boolean;
}

export const SujetoForm = ({
  index,
  field,
  remove,
  register,
  errors,
  setValue,
  watch,
  personaEnabled,
  vehiculoEnabled,
  anhSelected,
}: SujetoFormProps) => {

  const tipo = watch(`sujetos.${index}.tipo`);
  // const incluirCarga = watch(`sujetos.${index}.carguio_combustible`);

  const requiredLabel = (label: string) => `${label} *`;

  useEffect(() => {
    if (tipo === TipoSujeto.PERSONA) {
      setValue(`sujetos.${index}.placa`, null);
      // setValue(`sujetos.${index}.carguio_combustible`, false);
      // setValue(`sujetos.${index}.fechaini`, null);
      // setValue(`sujetos.${index}.fechafin`, null);
    } else if (tipo === TipoSujeto.VEHICULO) {
      setValue(`sujetos.${index}.ci`, null);
      setValue(`sujetos.${index}.complemento`, null);
    }
  }, [tipo]);

  return (
    <Box
      key={field.id}
      sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <FormGroup row sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={tipo === "persona"}
              onChange={() =>
                setValue(`sujetos.${index}.tipo`, TipoSujeto.PERSONA)
              }
              disabled={!personaEnabled}
            />
          }
          label="Persona"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={tipo === "vehiculo"}
              onChange={() =>
                setValue(`sujetos.${index}.tipo`, TipoSujeto.VEHICULO)
              }
              disabled={!vehiculoEnabled}
            />
          }
          label="Vehículo"
        />
        {index > 0 && (
          <IconButton onClick={() => remove(index)}>
            <RemoveIcon />
          </IconButton>
        )}
      </FormGroup>

      {tipo === "persona" ? (
        <>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={requiredLabel("C.I.")}
                {...register(`sujetos.${index}.ci`, { required: true })}
                error={!!errors?.sujetos?.[index]?.ci}
                helperText={errors?.sujetos?.[index]?.ci && "Requerido"}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Complemento"
                {...register(`sujetos.${index}.complemento`)}
                error={!!errors?.sujetos?.[index]?.complemento}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={requiredLabel("Placa")}
            {...register(`sujetos.${index}.placa`, { required: true })}
            error={!!errors?.sujetos?.[index]?.placa}
            helperText={errors?.sujetos?.[index]?.placa && "Requerido"}
          />
          {/*anhSelected && (
            <FormControlLabel
              control={
                <Checkbox
                  {...register(`sujetos.${index}.carguio_combustible`)}
                />
              }
              label="¿Incluir datos de carga de combustible?"
              sx={{ mt: 2 }}
            />
          )*/}
          {/*incluirCarga && (
            <>
              <TextField
                fullWidth
                type="date"
                label={requiredLabel("Fecha Inicio")}
                sx={{ mt: 2 }}
                {...register(`sujetos.${index}.fechaini`, { required: true })}
                error={!!errors?.sujetos?.[index]?.fechaini}
                helperText={errors?.sujetos?.[index]?.fechaini && "Requerido"}
              />
              <TextField
                fullWidth
                type="date"
                label={requiredLabel("Fecha Fin")}
                sx={{ mt: 2 }}
                {...register(`sujetos.${index}.fechafin`, { required: true })}
                error={!!errors?.sujetos?.[index]?.fechafin}
                helperText={errors?.sujetos?.[index]?.fechafin && "Requerido"}
              />
            </>
          )*/}
        </Box>
      )}
    </Box>
  );
};
