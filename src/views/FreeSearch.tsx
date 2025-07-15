import {
  Container,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  TextField,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { SolicitudInformacion, TipoSujeto } from "../api/types";
import { SujetoForm } from "../components/SujetoForm";
import { ServicioSelector } from "../components/ServiciosSelector";
import { getSelectedServiceTypes } from "../utils/serviceUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { resolverBusquedaLibre } from "../api/solicitudService";

export default function FreeSearch() {
  const [activeStep, setActiveStep] = useState(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

  const {
    control,
    register,
    watch,
    setError,
    clearErrors,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SolicitudInformacion>({
    mode: "onSubmit",
    defaultValues: {
      investigador: "Sebastian Rojas",
      analista_cfi: "Sebastian Rojas",
      consulta_libre: true,
      detalles: "",
      sistemas: {
        segip: false,
        sinarap: false,
        itv: false,
        // anh: false,
      },
      sujetos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sujetos",
  });

  const sistemas = watch("sistemas") ?? {};
  const { personaEnabled, vehiculoEnabled, anhSelected } =
    getSelectedServiceTypes(sistemas);

  const steps = ["Seleccionar servicios", "Ingresar sujetos", "Detalles"];

  const handleAddSujeto = () => {
    const defaultTipo = personaEnabled
      ? TipoSujeto.PERSONA
      : vehiculoEnabled
      ? TipoSujeto.VEHICULO
      : TipoSujeto.PERSONA;

    append({
      tipo: defaultTipo,
      ci: null,
      complemento: null,
      placa: null,
      // carguio_combustible: false,
      // fechaini: null,
      // fechafin: null,
    });
  };

  const handleNext = async () => {
    let valid = false;

    if (activeStep === 0) {
      const atLeastOne = Object.values(watch("sistemas") || {}).some(Boolean);
      if (!atLeastOne) {
        setError("sistemas", {
          type: "manual",
          message: "Seleccione al menos un servicio.",
        });
        return;
      } else {
        clearErrors("sistemas");
        valid = true;
        handleAddSujeto();
      }
    } else if (activeStep === 1) {
      valid = await trigger("sujetos");
    } else if (activeStep === 2) {
      valid = await trigger("detalles");
    } else {
      valid = true;
    }

    if (!valid) return;

    if (activeStep === steps.length - 1) {
      setOpenConfirmDialog(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 1) setValue("sujetos", []);
    setActiveStep((prev) => prev - 1);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    setOpenConfirmDialog(false);

    const valid = await trigger();
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const data = watch();
      console.log(data);
      const respuesta = await resolverBusquedaLibre(data);
      const { solicitud_informacion_id, ...results } = respuesta;
      setSubmitted(true);
      setTimeout(() => {
        navigate(`/results/${solicitud_informacion_id}`, {
          state: { results },
        });
      }, 2000);
    } catch (error) {
      console.error("Error al enviar los datos", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      {!submitted && (
        <>
          <Box sx={{ pt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <ServicioSelector
                register={register}
                watch={watch}
                errors={errors}
                setValue={setValue}
              />
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="h6" gutterBottom>
                  De las siguientes personas o placa:
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  Los campos marcados con * son obligatorios
                </Typography>

                {fields.map((field, index) => (
                  <SujetoForm
                    key={field.id}
                    index={index}
                    field={field}
                    remove={remove}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    personaEnabled={personaEnabled}
                    vehiculoEnabled={vehiculoEnabled}
                    anhSelected={anhSelected}
                  />
                ))}

                {fields.length < 12 && (
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddSujeto}
                    sx={{ mt: 2 }}
                  >
                    Agregar
                  </Button>
                )}
              </>
            )}

            {activeStep === 2 && (
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Agregue detalles relevantes para esta consulta libre."
                {...register("detalles", {
                  required: true,
                  minLength: 10,
                })}
                sx={{ mt: 1 }}
              />
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                variant="contained"
                type="button"
                disabled={isSubmitting}
              >
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
          </Box>
        </>
      )}

      {submitted && (
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Información enviada exitosamente
          </Typography>
        </Box>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            ¿Está seguro que desea enviar esta información?
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenConfirmDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={confirmSubmission}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
