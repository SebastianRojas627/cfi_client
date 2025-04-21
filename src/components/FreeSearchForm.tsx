import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import SubjectInput from "./SubjectInput";
import SearchResults from "./SearchResults";
import { Services, Subject } from "../types/types";

const FreeSearchForm: React.FC = () => {
  const [subject, setSubject] = useState<Subject>({
    tipo: "persona",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    ci: "",
    placa: "",
  });

  const [services, setServices] = useState<Services>({
    segip: false,
    sinarap: false,
    itv: false,
  });

  const [results, setResults] = useState<any>(null);

  const handleServiceChange =
    (key: keyof Services) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setServices({ ...services, [key]: e.target.checked });
    };

  const handleSearch = async () => {
    const payload = {
      numero_caso: null,
      investigador: "Consulta Libre",
      sujetos: [subject],
      sistemas: services,
    };

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResults(data);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Búsqueda Libre
      </Typography>

      <Typography variant="h6" gutterBottom mt={3}>
        Seleccione las fuentes de información que desea consultar:
      </Typography>

      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        {[
          { key: "segip", label: "SEGIP", numeral: "I" },
          { key: "sinarap", label: "SINARAP", numeral: "II" },
          { key: "itv", label: "ITV", numeral: "III" },
        ].map(({ key, label, numeral }) => (
          <Grid key={key} sx={{ width: "100%", maxWidth: 400 }}>
            <Box
              display="flex"
              alignItems="center"
              border={1}
              borderColor="grey.300"
              borderRadius={1}
              px={2}
              py={1}
              sx={{ backgroundColor: "#f9f9f9" }}
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

      <Typography variant="subtitle1" gutterBottom>
        de la siguiente persona o vehículo:
      </Typography>

      <SubjectInput subject={subject} setSubject={setSubject} />

      <Box mt={3}>
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      {results && <SearchResults results={results} />}
    </Box>
  );
};

export default FreeSearchForm;
