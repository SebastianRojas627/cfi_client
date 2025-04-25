import { Box, Grid, TextField, Typography } from '@mui/material';
import { Subject } from '../types/types';

interface Props {
  subject: Subject;
  onChange?: (updated: Subject) => void;
  readonly?: boolean;
}

const SubjectForm: React.FC<Props> = ({ subject, onChange, readonly }) => {
  const isPersona = subject.tipo === 'persona';

  const handleChange = (field: keyof Subject) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ ...subject, [field]: e.target.value });
    }
  };

  return (
    <Box
      border={1}
      borderRadius={2}
      borderColor="grey.300"
      px={2}
      py={2}
      mt={2}
      sx={{ backgroundColor: '#f9f9f9' }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {isPersona ? 'Datos de Persona' : 'Datos de Vehículo'}
      </Typography>

      <Grid container spacing={2}>
        {isPersona ? (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nombres"
                fullWidth
                value={subject.nombres || ''}
                onChange={handleChange('nombres')}
                disabled={readonly}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Apellido Paterno"
                fullWidth
                value={subject.apellido_paterno || ''}
                onChange={handleChange('apellido_paterno')}
                disabled={readonly}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Apellido Materno"
                fullWidth
                value={subject.apellido_materno || ''}
                onChange={handleChange('apellido_materno')}
                disabled={readonly}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Cédula de Identidad"
                fullWidth
                value={subject.ci || ''}
                onChange={handleChange('ci')}
                disabled={readonly}
              />
            </Grid>
          </>
        ) : (
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Placa del Vehículo"
              fullWidth
              value={subject.placa || ''}
              onChange={handleChange('placa')}
              disabled={readonly}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SubjectForm;
