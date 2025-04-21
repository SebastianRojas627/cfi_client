import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  results: any;
}

const SearchResults: React.FC<Props> = ({ results }) => {
  return (
    <>
      {Object.entries(results).map(([system, data]) => (
        <Accordion key={system}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{system.toUpperCase()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default SearchResults;
