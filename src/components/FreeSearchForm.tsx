import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ServiceSelector from "./ServicesSelector";
import SubjectForm from "./SubjectForm";
import { SistemasSolicitados, SujetoBusqueda, TipoSujeto } from "../api/types";
import { mockInvestigators } from "../data/mock";

const FreeSearchForm: React.FC = () => {
  const [subjectType, setSubjectType] = useState<TipoSujeto>(
    TipoSujeto.PERSONA
  );

  const [selectedInvestigador, setSelectedInvestigador] = useState("");

  const [sistemas, setServices] = useState<SistemasSolicitados>({
    segip: false,
    sinarap: false,
    itv: false,
    anh: false,
  });

  const handleServiceChange = (key: keyof typeof sistemas, value: boolean) => {
    setServices((prev) => ({ ...prev, [key]: value }));
  };

  const [subject, setSubject] = useState<SujetoBusqueda>({
    tipo: TipoSujeto.PERSONA,
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    ci: "",
    placa: "",
    complemento: "",
    carguio_combustible: false,
    fechafin: null,
    fechaini: null,
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tipo = e.target.value as TipoSujeto;
    setSubject(() => ({
      tipo,
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      ci: "",
      placa: "",
      complemento: "",
      fecha_nacimiento: null,
      carguio_combustible: false,
      fechafin: null,
      fechaini: null,
    }));
    setSubjectType(tipo);
  };

  const handleSearch = () => {
    console.log("Searching with:", { sistemas, subject });
  };

  return (
    <Box>
      <Typography color='text.primary' variant="h5" gutterBottom sx={{ mb: 2 }}>
        Búsqueda Libre
      </Typography>

      <Typography color='text.primary' variant="h6" gutterBottom sx={{ mb: 2 }}>
        Seleccione las fuentes de información que desea consultar:
      </Typography>

      <ServiceSelector sistemas={sistemas} onChange={handleServiceChange} />

      <Typography color='text.primary' variant="h6" sx={{ mt: 4 }}>
        De la siguiente persona o vehículo:
      </Typography>

      <RadioGroup
        row
        value={subjectType}
        onChange={handleTypeChange}
        sx={{ mt: 1, mb: 3 }}
      >
        <FormControlLabel
          value={TipoSujeto.PERSONA}
          control={<Radio />}
          label="Persona"
        />
        <FormControlLabel
          value={TipoSujeto.VEHICULO}
          control={<Radio />}
          label="Vehículo"
        />
      </RadioGroup>

      <SubjectForm subject={subject} onChange={setSubject} />

      <Box sx={{ mt: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="investigador-label">Investigador del CFI</InputLabel>
          <Select
            labelId="investigador-label"
            value={selectedInvestigador}
            label="Investigador del CFI"
            onChange={(e) => setSelectedInvestigador(e.target.value)}
          >
            {mockInvestigators.map((inv) => (
              <MenuItem key={inv.id} value={inv.name}>
                {inv.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Realizar Búsqueda
        </Button>
      </Box>
    </Box>
  );
};

export default FreeSearchForm;
