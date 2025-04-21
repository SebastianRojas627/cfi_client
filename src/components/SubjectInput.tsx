import React from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper
} from '@mui/material';
import { Subject } from '../types/types';

interface Props {
  subject: Subject;
  setSubject: (s: Subject) => void;
}

const SubjectInput: React.FC<Props> = ({ subject, setSubject }) => {
  const handleChange = (field: keyof Subject) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubject({ ...subject, [field]: e.target.value });

  return (
    <Paper variant="outlined" sx={{ p: 3, mt: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        Tipo de Sujeto
      </Typography>
      <RadioGroup
        row
        value={subject.tipo}
        onChange={handleChange('tipo')}
        sx={{ mb: 2 }}
      >
        <FormControlLabel value="persona" control={<Radio />} label="Persona" />
        <FormControlLabel value="vehiculo" control={<Radio />} label="Vehículo" />
      </RadioGroup>

      {subject.tipo === 'persona' ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="CI"
              value={subject.ci}
              onChange={handleChange('ci')}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nombres"
              value={subject.nombres}
              onChange={handleChange('nombres')}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Apellido Paterno"
              value={subject.apellido_paterno}
              onChange={handleChange('apellido_paterno')}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Apellido Materno"
              value={subject.apellido_materno}
              onChange={handleChange('apellido_materno')}
              fullWidth
            />
          </Grid>
        </Grid>
      ) : (
        <TextField
          label="Placa"
          value={subject.placa}
          onChange={handleChange('placa')}
          fullWidth
        />
      )}
    </Paper>
  );
};

export default SubjectInput;
