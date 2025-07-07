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
  Divider,
} from "@mui/material";
import { RespuestaSinarap } from "../api/types";

const fuentes: ('FELCC' | 'FELCN' | 'TRANSITO')[] = ["FELCC", "FELCN", "TRANSITO"];

export const SinarapInfo = ({ sinarap }: { sinarap: RespuestaSinarap }) => {
  const { antecedentes } = sinarap;

  return (
    <Box mb={4}>
      <Typography color='text.primary' variant="h6" gutterBottom>
        <strong>Registros en SINARAP</strong>
      </Typography>

      {fuentes.map((fuente, idx) => {
        const registros = antecedentes.filter((a) => a.fuente === fuente);

        return (
          <Box key={fuente} mb={4}>
            {idx > 0 && <Divider sx={{ my: 2 }} />}
            <Typography color='text.primary' variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Fuente: {fuente}
            </Typography>

            {registros.length === 0 ? (
              <Typography variant="body2" color="secondary.main" sx={{ ml: 1 }}>
                NO SE ENCONTRARON REGISTROS
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>HECHO</TableCell>
                      <TableCell>DETALLE</TableCell>
                      <TableCell>FECHA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registros.map((registro, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{registro.hecho || "—"}</TableCell>
                        <TableCell>{registro.detalle || "—"}</TableCell>
                        <TableCell>
                          {registro.fecha
                            ? new Date(registro.fecha).toLocaleDateString()
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
