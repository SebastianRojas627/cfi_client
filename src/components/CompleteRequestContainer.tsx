import React, { useEffect, useState } from 'react';
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress
} from '@mui/material';
import CompleteRequestForm from './CompleteRequestForm';
import { SolicitudInformacion } from '../types/types';

interface Props {
  preloadedRequest?: SolicitudInformacion | null; // Used when user comes from the table view
}

const CompleteRequestContainer: React.FC<Props> = ({ preloadedRequest }) => {
  const [selectedRequest, setSelectedRequest] = useState<SolicitudInformacion | null>(preloadedRequest || null);
  const [pendingRequests, setPendingRequests] = useState<SolicitudInformacion[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulate fetching all pending requests if preloadedRequest not passed
  useEffect(() => {
    if (!preloadedRequest) {
      setLoading(true);
      // Replace this with API call
      setTimeout(() => {
        setPendingRequests([
          {
            numero_caso: 4321,
            investigador: 'TTE. CASTILLO',
            unidad_policial: 'FELCC La Paz',
            sujetos: [
              { tipo: 'persona', nombres: 'JUAN', apellido_paterno: 'PEREZ', apellido_materno: 'LOPEZ', ci: '12345678', placa: '' },
              { tipo: 'vehiculo', nombres: '', apellido_paterno: '', apellido_materno: '', ci: '', placa: '1852PHD' }
            ],
            sistemas: { segip: true, sinarap: true, itv: true }
          },
          {
            numero_caso: 4567,
            investigador: 'SGTO. RAMIREZ',
            unidad_policial: 'FELCC El Alto',
            sujetos: [
              { tipo: 'persona', nombres: 'MARIA', apellido_paterno: 'GUTIERREZ', apellido_materno: 'QUISPE', ci: '87654321', placa: '' }
            ],
            sistemas: { segip: true, sinarap: false, itv: false }
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [preloadedRequest]);

  const handleSelect = (caseNumber: number) => {
    const found = pendingRequests.find(req => req.numero_caso === caseNumber);
    if (found) {
      setSelectedRequest(found);
    }
  };

  return (
    <Box>
      {!selectedRequest && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Seleccione una solicitud de información pendiente:
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <FormControl fullWidth>
              <InputLabel>Solicitudes pendientes</InputLabel>
              <Select
                label="Solicitudes pendientes"
                onChange={(e) => handleSelect(Number(e.target.value))}
              >
                {pendingRequests.map((req) => (
                  <MenuItem key={req.numero_caso} value={req.numero_caso}>
                    Caso #{req.numero_caso} — {req.investigador} ({req.unidad_policial})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      {selectedRequest && (
        <CompleteRequestForm
          initialSubjects={selectedRequest.sujetos}
          initialServices={selectedRequest.sistemas}
          investigators={['TTE. CASTILLO', 'SGTO. RAMIREZ', 'CBO. MAMANI']}
        />
      )}
    </Box>
  );
};

export default CompleteRequestContainer;
