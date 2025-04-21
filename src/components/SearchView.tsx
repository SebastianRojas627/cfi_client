import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FreeSearchForm from "./FreeSearchForm";
import CompleteRequestContainer from "./CompleteRequestContainer";

const SearchView: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        <Tab label="Free Search" />
        <Tab label="Complete Info Request" />
      </Tabs>

      <Box mt={2}>
        {tab === 0 && <FreeSearchForm />}
        {tab === 1 && (
          <CompleteRequestContainer/>
        )}
      </Box>
    </Box>
  );
};

export default SearchView;
