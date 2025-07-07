import { Grid, Typography } from "@mui/material";
import { formatKey } from "./formatKey";

export const renderKeyValueGrid = (data: Record<string, any>) => (
  <Grid container spacing={2}>
    {Object.entries(data).map(([key, value]) => (
      <Grid size={{ xs: 12, md: 6 }} key={key}>
        <Typography>
          <strong>{formatKey(key)}:</strong> {value}
        </Typography>
      </Grid>
    ))}
  </Grid>
);
