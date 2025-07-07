import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export const CountCard = ({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      backgroundColor: color,
      color: "white",
    }}
  >
    <Box mr={2}>{icon}</Box>
    <Box>
      <Typography color='primary.contrastText' variant="h6">{title}</Typography>
      <Typography color='primary.contrastText' variant="h4">{value}</Typography>
    </Box>
  </Paper>
);
