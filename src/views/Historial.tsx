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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getSolicitudes } from "../api/solicitudService";
import { SolicitudInformacion } from "../api/types";

const mockData = Array.from({ length: 35 }, (_, i) => ({
  solicitud_informacion_id: `uuid-${i + 1}`,
  numero_caso: 1000 + i,
  nombres: `Nombre${i}`,
  apellido_paterno: `ApellidoP${i}`,
  apellido_materno: `ApellidoM${i}`,
  ci: `123456${i}`,
  complemento: null,
  fecha_nacimiento: "1990-01-01",
  placa: `XYZ-${i}`,
  delito: "Robo",
  investigador: `Invest ${i}`,
  unidad_investigativa: `Unidad ${i % 3}`,
  tipo: i % 2 === 0 ? "Persona" : "Vehículo",
  numero_caso_unidad: `UC-${i}`,
  fecha_solicitud: "2025-04-10",
  segip: true,
  sinarap: false,
  itv: true,
  impuestos: false,
  completado: i % 3 === 0,
}));

const RequestHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [responseRows, setResponseRows ] = useState<SolicitudInformacion[]>([])

  const fetchSolicitudes = async () => {
    try {
      const response = await getSolicitudes();
      console.log(response);
      setResponseRows(response)
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = mockData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
                <TableRow key={row.numero_caso}>
                  <TableCell>{row.numero_caso}</TableCell>
                  <TableCell>{row.ci}</TableCell>
                  <TableCell>{row.delito}</TableCell>
                  <TableCell>{row.investigador}</TableCell>
                  <TableCell>{row.fecha_solicitud}</TableCell>
                  <TableCell>
                    {row.completado ? "Completado" : "Pendiente"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton title="Ver Solicitud">
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
          count={mockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Filas por página"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default RequestHistory;
