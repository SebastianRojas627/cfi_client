import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Box,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

interface DocumentPreviewerProps {
  open: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  loading: boolean;
}

export const DocumentPreviewer: React.FC<DocumentPreviewerProps> = ({
  open,
  onClose,
  pdfUrl,
  loading,
}) => {
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const handleAttemptClose = () => {
    setConfirmCloseOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmCloseOpen(false);
    onClose();
  };

  const handleCancelClose = () => {
    setConfirmCloseOpen(false);
  };

  const handlePrint = () => {
    const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleAttemptClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Vista Previa del Reporte
          <IconButton
            aria-label="cerrar"
            onClick={handleAttemptClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ height: "80vh" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            pdfUrl && (
              <iframe
                id="pdf-iframe"
                src={pdfUrl}
                title="Vista previa PDF"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrint} startIcon={<PrintIcon />} disabled={loading}>
            Imprimir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmCloseOpen} onClose={handleCancelClose}>
        <DialogTitle>¿Cerrar la vista previa?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cerrar este reporte?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmClose} color="error" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
