// src/containers/CompleteRequestContainer.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import CompleteRequestForm from './CompleteRequestForm';

// src/mock/mockPendingRequests.ts

// src/mock/mockInvestigators.ts

const mockInvestigators = [
  {id: 1, name: 'TTE. CASTILLO'},
  {id: 2, name: 'SGTO. MENDOZA'},
  {id: 3, name: 'SGTO. FLORES'},
  {id: 4, name: 'TTE. GUTIERREZ'},
  {id: 5, name: 'SGTO. SANDOVAL'},
];


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
    },
    sujetos: [
      {
        tipo: 'persona',
        nombres: 'JUAN',
        apellido_paterno: 'PEREZ',
        apellido_materno: 'LOPEZ',
        ci: '12345678',
        placa: '',
      },
      {
        tipo: 'vehiculo',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        ci: '',
        placa: '1852PHD',
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
    },
    sujetos: [
      {
        tipo: 'persona',
        nombres: 'MARIA',
        apellido_paterno: 'GONZALES',
        apellido_materno: 'RAMIREZ',
        ci: '98765432',
        placa: '',
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
    },
    sujetos: [
      {
        tipo: 'vehiculo',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        ci: '',
        placa: '7291XYZ',
      },
    ],
  },
];


const CompleteRequestContainer: React.FC = () => {
  const { requestId } = useParams(); // from route if accessed via button
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(requestId || null);

  const [caseNumber, setCaseNumber] = useState('');
  const [services, setServices] = useState({ segip: false, sinarap: false, itv: false });
  const [subjects, setSubjects] = useState<any[]>([]);
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
          caseNumber={caseNumber}
          services={services}
          subjects={subjects}
          investigators={mockInvestigators}
          selectedInvestigator={selectedInvestigator}
          onInvestigatorChange={setSelectedInvestigator}
          onCaseNumberChange={setCaseNumber}
        />
      )}
    </Box>
  );
};

export default CompleteRequestContainer;
