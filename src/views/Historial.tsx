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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { getSolicitudes } from "../api/solicitudService";
import { SolicitudInformacion } from "../api/types";
import SolicitudDetail from "../components/SolicitudDetail";

const RequestHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [responseRows, setResponseRows] = useState<SolicitudInformacion[]>([]);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState<string | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenDetail = (id: string) => {
    setSelectedSolicitudId(id);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setSelectedSolicitudId(null);
  };

  const fetchSolicitudes = async (
    newPage: number = page,
    newRowsPerPage: number = rowsPerPage
  ) => {
    const offset: number = newPage * newRowsPerPage;
    const limit: number = newRowsPerPage;

    try {
      const response = await getSolicitudes(offset, limit);
      setTotal(response.total);
      setResponseRows(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleChangePage = async (_: any, newPage: number) => {
    setPage(newPage);
    await fetchSolicitudes(newPage);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    await fetchSolicitudes(0, newRows);
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
                <TableCell>Numero de Caso</TableCell>
                <TableCell>Unidad Investigativa</TableCell>
                <TableCell>Delito</TableCell>
                <TableCell>Investigador</TableCell>
                <TableCell>Fecha Solicitud</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responseRows.map((row) => (
                <TableRow key={row.solicitud_informacion_id}>
                  <TableCell>{row.numero_caso}</TableCell>
                  <TableCell>{row.unidad_investigativa}</TableCell>
                  <TableCell>{row.delito}</TableCell>
                  <TableCell>{row.investigador}</TableCell>
                  <TableCell>{String(row.fecha_solicitud)}</TableCell>
                  <TableCell>
                    {row.completado ? "Completado" : "Pendiente"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      title="Ver Solicitud"
                      onClick={() =>
                        handleOpenDetail(row.solicitud_informacion_id)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      title="Ver Documento"
                      onClick={() =>
                        console.log(
                          "Ver Documento",
                          row.solicitud_informacion_id
                        )
                      }
                    >
                      <DescriptionIcon />
                    </IconButton>
                    {row.completado && (
                      <IconButton
                        title="Ver Informe"
                        onClick={() =>
                          console.log(
                            "Ver Informe",
                            row.solicitud_informacion_id
                          )
                        }
                      >
                        <AssignmentIcon />
                      </IconButton>
                    )}
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
    </Box>
  );
};

export default RequestHistory;
