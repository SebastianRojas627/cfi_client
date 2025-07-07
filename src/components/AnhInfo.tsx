import { Box, Typography } from "@mui/material";
import { renderKeyValueGrid } from "../utils/renderKeyValueGrid";

export const AnhInfo = ({ anh }: { anh: any }) => (
  <Box mb={4}>
    <Typography variant="h6" gutterBottom>Registros en ANH</Typography>
    {renderKeyValueGrid(anh)}
  </Box>
);
