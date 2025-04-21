import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Services } from '../types/types';

interface Props {
  services: Services;
  setServices: (s: Services) => void;
}

const ServiceSelector: React.FC<Props> = ({ services, setServices }) => {
  const toggle = (key: keyof Services) => () => {
    setServices({ ...services, [key]: !services[key] });
  };

  return (
    <FormGroup row>
      {Object.keys(services).map(key => (
        <FormControlLabel
          key={key}
          control={<Checkbox checked={services[key as keyof Services]} onChange={toggle(key as keyof Services)} />}
          label={key.toUpperCase()}
        />
      ))}
    </FormGroup>
  );
};

export default ServiceSelector;
