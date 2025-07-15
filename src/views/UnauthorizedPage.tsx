import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: "warning.main" }} />
      <Typography variant="h4" color="text.primary" gutterBottom>
        Acceso denegado
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
        No tiene permisos para acceder a esta sección del sistema.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Ir al inicio
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
