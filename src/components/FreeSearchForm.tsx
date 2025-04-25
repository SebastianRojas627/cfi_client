import { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import ServiceSelector from './ServicesSelector';
import SubjectForm from './SubjectForm';
import { Subject } from '../types/types';

const FreeSearchForm: React.FC = () => {
  const [subjectType, setSubjectType] = useState<'persona' | 'vehiculo'>('persona');

  const [services, setServices] = useState({
    segip: false,
    sinarap: false,
    itv: false,
  });

  const handleServiceChange = (key: keyof typeof services, value: boolean) => {
    setServices((prev) => ({ ...prev, [key]: value }));
  };

  const [subject, setSubject] = useState<Subject>({
    tipo: 'persona',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    ci: '',
    placa: '',
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tipo = e.target.value as 'persona' | 'vehiculo';
    setSubject((prev) => ({
      tipo,
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      ci: '',
      placa: '',
    }));
    setSubjectType(tipo);
  };

  const handleSearch = () => {
    // Implement API call to search here
    console.log('Searching with:', { services, subject });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Búsqueda Libre
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Seleccione las fuentes de información que desea consultar:
      </Typography>

      <ServiceSelector services={services} onChange={handleServiceChange} />

      <Typography variant="h6" sx={{ mt: 4 }}>
        De la siguiente persona o vehículo:
      </Typography>

      <RadioGroup
        row
        value={subjectType}
        onChange={handleTypeChange}
        sx={{ mt: 1, mb: 3 }}
      >
        <FormControlLabel value="persona" control={<Radio />} label="Persona" />
        <FormControlLabel value="vehiculo" control={<Radio />} label="Vehículo" />
      </RadioGroup>

      <SubjectForm subject={subject} onChange={setSubject} />

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Realizar Búsqueda
        </Button>
      </Box>
    </Box>
  );
};

export default FreeSearchForm;
