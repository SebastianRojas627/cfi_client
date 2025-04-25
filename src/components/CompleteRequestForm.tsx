import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ServiceSelector from './ServicesSelector';
import SubjectForm from './SubjectForm';

interface Subject {
  tipo: 'persona' | 'vehiculo';
  nombres?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  ci?: string;
  placa?: string;
}

interface Services {
  segip: boolean;
  sinarap: boolean;
  itv: boolean;
}

interface Investigator {
  id: number;
  name: string;
}

// Props expected for this component
interface CompleteRequestFormProps {
  caseNumber: string;
  services: Services;
  subjects: Subject[];
  investigators: Investigator[];
  selectedInvestigator: string;
  onInvestigatorChange: (value: string) => void;
  onCaseNumberChange: (value: string) => void;
}

const CompleteRequestForm: React.FC<CompleteRequestFormProps> = ({
  caseNumber,
  services,
  subjects,
  investigators,
  selectedInvestigator,
  onInvestigatorChange,
  onCaseNumberChange,
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Completar Solicitud de Información
      </Typography>

      {/* Case Number Input */}
      <TextField
        label="Número de Caso"
        fullWidth
        value={caseNumber}
        onChange={(e) => onCaseNumberChange(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Service Selector (read-only) */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Servicios Solicitados:
      </Typography>
      <ServiceSelector services={services} readonly />

      {/* Subject Forms (read-only) */}
      <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
        Sujetos Relacionados:
      </Typography>
      {subjects.map((sujeto, idx) => (
        <SubjectForm key={idx} subject={sujeto} readonly />
      ))}

      {/* Investigator Dropdown */}
      <Box sx={{ mt: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="investigador-label">Investigador del CFI</InputLabel>
          <Select
            labelId="investigador-label"
            value={selectedInvestigator}
            label="Investigador del CFI"
            onChange={(e) => onInvestigatorChange(e.target.value)}
          >
            {investigators.map((inv) => (
              <MenuItem key={inv.id} value={inv.name}>
                {inv.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CompleteRequestForm;
