import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { SistemasSolicitados } from "../api/types";

interface Props {
  sistemas: SistemasSolicitados;
  onChange?: (key: keyof SistemasSolicitados, value: boolean) => void;
  readonly?: boolean;
}

const serviceLabels = [
  { key: "segip", label: "SEGIP", numeral: "I" },
  { key: "sinarap", label: "SINARAP", numeral: "II" },
  { key: "itv", label: "ITV", numeral: "III" },
  // { key: 'anh', label: 'ANH', numeral: 'IV' }
];

const ServiceSelector: React.FC<Props> = ({ sistemas, onChange, readonly }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }} justifyContent="center">
      {serviceLabels.map(({ key, label, numeral }) => (
        <Grid key={key} size={{ xs: 12, sm: 6, md: 6 }} sx={{ maxWidth: 400 }}>
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
            <Typography
              color="text.primary"
              variant="subtitle1"
              sx={{ width: 30, mr: 1 }}
            >
              {numeral}.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sistemas[key as keyof SistemasSolicitados]}
                  disabled={readonly}
                  onChange={(e) =>
                    onChange &&
                    onChange(key as keyof SistemasSolicitados, e.target.checked)
                  }
                />
              }
              label={
                <Typography color="text.primary" variant="subtitle1">
                  {label}
                </Typography>
              }
              sx={{ marginLeft: 0 }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceSelector;
