import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
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
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
      <Typography variant="h4" color="error.main" gutterBottom>
        Algo salió mal
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
        {message || "No se pudo procesar su solicitud. Intente nuevamente o contacte al administrador."}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Ir al inicio
      </Button>
    </Box>
  );
};

export default ErrorPage;
