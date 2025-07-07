import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import {
  getReportes,
  getResultadosSolicitudCompleta,
} from "../api/solicitudService";
import { Reporte, TableRequest } from "../api/types";
import SolicitudDetail from "../components/SolicitudDetail";
import { useNavigate } from "react-router";

const DocumentReport = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [responseRows, setResponseRows] = useState<Reporte[]>([]);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState<string | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dialogCaso, setDialogCaso] = useState(0);
  const navigate = useNavigate();

  const handleOpenDetail = (id: string) => {
    setSelectedSolicitudId(id);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setSelectedSolicitudId(null);
  };

  const fetchSolicitudes = async () => {
    try {
      const query: TableRequest = {
        pageSize: rowsPerPage,
        page,
        sortBy: null,
        order: null,
        usuario: null,
        solicitud_informacion_id: null,
      };
      const response = await getReportes(query);
      console.log(response);
      setTotal(response.meta.total);
      setResponseRows(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(
    () => {
      fetchSolicitudes();
    },
    [] // [solicitud_informacion_id] crear estados para las columnas que pueden ser filtradas
  );

  const handleChangePage = async (_: any, newPage: number) => {
    setPage(newPage);
    await fetchSolicitudes();
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    await fetchSolicitudes();
  };

  const handleGetResults = async () => {
    setConfirmOpen(true);
    const data = await getResultadosSolicitudCompleta(dialogCaso);
    const { solicitud_informacion_id, ...results } = data;
    navigate(`/results/${solicitud_informacion_id}`, { state: { results } });
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setDialogCaso(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Historial de Solicitudes de Información
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Orden</TableCell>
                <TableCell>Numero de Caso</TableCell>
                <TableCell>Usuario Solicitante</TableCell>
                <TableCell>Numero de Copia</TableCell>
                <TableCell>Justificacion</TableCell>
                <TableCell>Fecha Solicitud</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseRows.map((row) => (
                <TableRow key={row.rowNumber}>
                  <TableCell>{row.rowNumber}</TableCell>
                  <TableCell>{row.solicitud_informacion.numero_caso}</TableCell>
                  <TableCell>{row.usuario_id}</TableCell>
                  <TableCell>{row.numero_copia}</TableCell>
                  <TableCell>{row.justificacion}</TableCell>
                  <TableCell>{new Date(row.fecha_generacion).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      title="Ver Solicitud"
                      onClick={() =>
                        handleOpenDetail(row.solicitud_informacion_id)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Filas por página"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={detailOpen}
          onClose={handleCloseDetail}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Detalles de Solicitud
            <IconButton
              onClick={handleCloseDetail}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedSolicitudId && (
              <SolicitudDetail solicitudId={selectedSolicitudId} />
            )}
          </DialogContent>
        </Dialog>
      </Paper>
      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Confirmar búsqueda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea ver los resultados del caso #{dialogCaso}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleGetResults} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentReport;
