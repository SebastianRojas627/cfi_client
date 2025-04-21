import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import SubjectInput from './SubjectInput';
import { Services, Subject } from '../types/types';

interface Props {
  initialSubjects: Subject[];
  initialServices: Services;
  investigators: string[];
}

const CompleteRequestForm: React.FC<Props> = ({
  initialSubjects,
  initialServices,
  investigators
}) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [services, setServices] = useState<Services>(initialServices);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [investigator, setInvestigator] = useState('');

  const handleServiceChange = (key: keyof Services) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setServices({ ...services, [key]: e.target.checked });
  };

  const handleSubjectChange = (index: number, updated: Subject) => {
    const updatedList = [...subjects];
    updatedList[index] = updated;
    setSubjects(updatedList);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Completar Solicitud de Información
      </Typography>

      <TextField
        label="Número de Caso"
        value={caseNumber}
        onChange={(e) => setCaseNumber(e.target.value)}
        fullWidth
        sx={{ mt: 2, mb: 4 }}
      />

      <Typography variant="h6" gutterBottom>
        Fuentes de información a consultar:
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        {[
          { key: 'segip', label: 'SEGIP', numeral: 'I' },
          { key: 'sinarap', label: 'SINARAP', numeral: 'II' },
          { key: 'itv', label: 'ITV', numeral: 'III' }
        ].map(({ key, label, numeral }) => (
          <Grid key={key} sx={{ width: '100%', maxWidth: 400 }}>
            <Box
              display="flex"
              alignItems="center"
              border={1}
              borderColor="grey.300"
              borderRadius={1}
              px={2}
              py={1}
              sx={{ backgroundColor: '#f9f9f9' }}
            >
              <Typography variant="subtitle1" sx={{ width: 30, mr: 1 }}>
                {numeral}.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services[key as keyof Services]}
                    onChange={handleServiceChange(key as keyof Services)}
                  />
                }
                label={<Typography variant="subtitle1">{label}</Typography>}
                sx={{ marginLeft: 0 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {subjects.map((subject, index) => (
        <Box key={index} mb={4}>
          <Typography variant="h6" gutterBottom>
            Sujeto {index + 1}
          </Typography>
          <SubjectInput
            subject={subject}
            setSubject={(updated) => handleSubjectChange(index, updated)}
          />
        </Box>
      ))}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Investigador</InputLabel>
        <Select
          value={investigator}
          label="Investigador"
          onChange={(e) => setInvestigator(e.target.value)}
        >
          {investigators.map((inv, i) => (
            <MenuItem key={i} value={inv}>
              {inv}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add a button here for "Buscar" or "Completar solicitud" when ready */}
    </Box>
  );
};

export default CompleteRequestForm;
