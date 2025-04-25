import { Checkbox, FormControlLabel, Grid, Typography, Box } from '@mui/material';
import { Services } from '../types/types';

interface Props {
  services: Services;
  onChange?: (key: keyof Services, value: boolean) => void;
  readonly?: boolean;
}

const serviceLabels = [
  { key: 'segip', label: 'SEGIP', numeral: 'I' },
  { key: 'sinarap', label: 'SINARAP', numeral: 'II' },
  { key: 'itv', label: 'ITV', numeral: 'III' }
];

const ServiceSelector: React.FC<Props> = ({ services, onChange, readonly }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2} sx={{ mb: 4 }}>
      {serviceLabels.map(({ key, label, numeral }) => (
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
                  disabled={readonly}
                  onChange={(e) =>
                    onChange && onChange(key as keyof Services, e.target.checked)
                  }
                />
              }
              label={<Typography variant="subtitle1">{label}</Typography>}
              sx={{ marginLeft: 0 }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceSelector;
