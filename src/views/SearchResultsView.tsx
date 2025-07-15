import { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { SearchResultModal } from "../components/SearchResultModal";
import { ResultadoBusqueda } from "../api/types";
import { DocumentPreviewer } from "../components/DocumentPreviewer";
import { getGeneratedReport } from "../api/solicitudService";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export const SearchResultsView = ({
  response,
}: {
  response: ResultadoBusqueda;
}) => {
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showJustificationDialog, setShowJustificationDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<{ justification: string }>({
    mode: "onChange",
    defaultValues: { justification: "" },
  });

  const onSubmitJustification = () => {
    setShowJustificationDialog(false);
    setShowConfirmationDialog(true);
  };

  const handleGenerateReport = async (justificationText: string) => {
    try {
      setLoadingPDF(true);
      setDialogOpen(true);

      console.log(response.solicitud_informacion_id)

      const res = await getGeneratedReport({
        usuario_id: "Sebastian Rojas", // user?.fullName,
        solicitud_informacion_id: response.solicitud_informacion_id,
        justificacion: justificationText,
      });

      const blob = await res;
      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
    } catch (err) {
      console.error("Error generando el reporte", err);
    } finally {
      setLoadingPDF(false);
    }
  };

  const handleClickGenerate = () => {
    setShowJustificationDialog(true);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Resultados de Búsqueda - Caso #{response.numero_caso}
      </Typography>
      <Grid container spacing={2}>
        {response.results.map((result, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box
                component="img"
                src={
                  result.tipo === "persona"
                    ? result.segip?.Fotografia
                    : result.itv?.datos_tecnicos?.fotografia
                }
                alt={`Imagen de ${result.tipo}`}
                sx={{
                  width: "100%",
                  maxHeight: 250,
                  objectFit: "contain",
                  borderRadius: 1,
                  display: "block",
                  mb: 3,
                }}
              />
              <Typography variant="h6">
                Sujeto #{result.sujeto} - {result.tipo.toUpperCase()}
              </Typography>

              {result.tipo === "persona" && (
                <>
                  <Typography>
                    <strong>CI:</strong> {result.ci}
                  </Typography>
                  <Typography>
                    <strong>Nombre:</strong> {result.segip?.Nombres}{" "}
                    {result.segip?.PrimerApellido}
                  </Typography>
                </>
              )}

              {result.tipo === "vehiculo" && (
                <>
                  <Typography>
                    <strong>Placa:</strong> {result.placa}
                  </Typography>
                  <Typography>
                    <strong>Marca:</strong> {result.itv?.datos_tecnicos?.marca}
                  </Typography>
                </>
              )}

              <Button
                variant="outlined"
                onClick={() => setSelectedResult(result)}
                sx={{ mt: 1 }}
              >
                Ver Detalles
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickGenerate}
          disabled={loadingPDF}
        >
          {loadingPDF ? <CircularProgress size={24} /> : "Generar Reporte"}
        </Button>
      </Box>

      <Dialog
        open={showJustificationDialog}
        onClose={() => setShowJustificationDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmitJustification)}>
          <DialogTitle>Justificación requerida</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Explique por qué necesita el reporte"
              {...register("justification", { required: true, minLength: 10 })}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowJustificationDialog(false);
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              Continuar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea generar el reporte de este caso? Esta accion sera registrada.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmationDialog(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit((data) => {
              setShowConfirmationDialog(false);
              handleGenerateReport(data.justification);
              reset();
            })}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <DocumentPreviewer
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        pdfUrl={pdfUrl}
        loading={loadingPDF}
      />

      {selectedResult && (
        <SearchResultModal
          open={!!selectedResult}
          onClose={() => setSelectedResult(null)}
          result={selectedResult}
        />
      )}
    </>
  );
};
