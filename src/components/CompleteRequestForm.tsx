import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import SubjectForm from './SubjectForm';
import { SistemasSolicitados, SujetoBusqueda } from '../api/types';
import ServiceSelector from './ServicesSelector';

interface Investigador {
  id: number;
  name: string;
}

// Props expected for this component
interface CompleteRequestFormProps {
  numero_caso: string;
  sistemas: SistemasSolicitados;
  sujetos: SujetoBusqueda[];
  investigadores: Investigador[];
  selectedInvestigador: string;
  onInvestigadorChange: (value: string) => void;
  onNumeroCasoChange: (value: string) => void;
}

const CompleteRequestForm: React.FC<CompleteRequestFormProps> = ({
  numero_caso,
  sistemas,
  sujetos,
  investigadores,
  selectedInvestigador,
  onInvestigadorChange,
  onNumeroCasoChange,
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
        value={numero_caso}
        onChange={(e) => onNumeroCasoChange(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Service Selector (read-only) */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Servicios Solicitados:
      </Typography>
      <ServiceSelector sistemas={sistemas} readonly />

      {/* Subject Forms (read-only) */}
      <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
        Sujetos Relacionados:
      </Typography>
      {sujetos.map((sujeto, idx) => (
        <SubjectForm key={idx} subject={sujeto} readonly />
      ))}

      {/* Investigador Dropdown */}
      <Box sx={{ mt: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="investigador-label">Investigador del CFI</InputLabel>
          <Select
            labelId="investigador-label"
            value={selectedInvestigador}
            label="Investigador del CFI"
            onChange={(e) => onInvestigadorChange(e.target.value)}
          >
            {investigadores.map((inv) => (
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
