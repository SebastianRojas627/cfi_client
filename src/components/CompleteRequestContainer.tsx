import React, { useEffect, useState } from 'react';
import { Box, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import CompleteRequestForm from './CompleteRequestForm';
import { SistemasSolicitados, SujetoBusqueda, TipoSujeto } from '../api/types';
import { mockInvestigators } from '../data/mock';

const mockPendingRequests = [
  {
    id: 'req-001',
    numero_caso: 4321,
    investigador: 'Sgto. Rodríguez',
    unidad: 'Unidad Antinarcóticos',
    sistemas: {
      segip: true,
      sinarap: true,
      itv: false,
      impuestos: false,
    },
    sujetos: [
      {
        tipo: TipoSujeto.PERSONA,
        nombres: 'JUAN',
        apellido_paterno: 'PEREZ',
        apellido_materno: 'LOPEZ',
        ci: '12345678',
        placa: '',
        complemento: '',
        fecha_nacimiento: null
      },
      {
        tipo: TipoSujeto.VEHICULO,
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        ci: '',
        placa: '1852PHD',
        complemento: '',
        fecha_nacimiento: null
      },
    ],
  },
  {
    id: 'req-002',
    numero_caso: 8765,
    investigador: 'Tte. Quispe',
    unidad: 'Unidad de Trata y Tráfico',
    sistemas: {
      segip: true,
      sinarap: false,
      itv: true,
      impuestos: false,
    },
    sujetos: [
      {
        tipo: TipoSujeto.PERSONA,
        nombres: 'MARIA',
        apellido_paterno: 'GONZALES',
        apellido_materno: 'RAMIREZ',
        ci: '98765432',
        placa: '',
        complemento: '',
        fecha_nacimiento: null
      },
    ],
  },
  {
    id: 'req-003',
    numero_caso: 1023,
    investigador: 'Sgto. Vargas',
    unidad: 'Unidad de Robo de Vehículos',
    sistemas: {
      segip: false,
      sinarap: true,
      itv: true,
      impuestos: false,
    },
    sujetos: [
      {
        tipo: TipoSujeto.VEHICULO,
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        ci: '',
        placa: '7291XYZ',
        complemento: '',
        fecha_nacimiento: null
      },
    ],
  },
];


const CompleteRequestContainer: React.FC = () => {
  const { requestId } = useParams();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(requestId || null);

  const [caseNumber, setCaseNumber] = useState('');
  const [services, setServices] = useState<SistemasSolicitados>({ segip: false, sinarap: false, itv: false, impuestos: false });
  const [subjects, setSubjects] = useState<SujetoBusqueda[]>([]);
  const [selectedInvestigator, setSelectedInvestigator] = useState('');

  useEffect(() => {
    if (selectedRequestId) {
      const request = mockPendingRequests.find((r) => r.id === selectedRequestId);
      if (request) {
        setCaseNumber(request.numero_caso.toString());
        setServices(request.sistemas);
        setSubjects(request.sujetos);
        setSelectedInvestigator('');
      }
    }
  }, [selectedRequestId]);

  return (
    <Box>
      {!requestId && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Seleccione una solicitud pendiente:
          </Typography>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id="select-request-label">Solicitud</InputLabel>
            <Select
              labelId="select-request-label"
              value={selectedRequestId || ''}
              label="Solicitud"
              onChange={(e) => setSelectedRequestId(e.target.value)}
            >
              {mockPendingRequests.map((req) => (
                <MenuItem key={req.id} value={req.id}>
                  {`Caso ${req.numero_caso} - ${req.investigador} (${req.unidad})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {selectedRequestId && (
        <CompleteRequestForm
          numero_caso={caseNumber}
          sistemas={services}
          sujetos={subjects}
          investigadores={mockInvestigators}
          selectedInvestigador={selectedInvestigator}
          onInvestigadorChange={setSelectedInvestigator}
          onNumeroCasoChange={setCaseNumber}
        />
      )}
    </Box>
  );
};

export default CompleteRequestContainer;
