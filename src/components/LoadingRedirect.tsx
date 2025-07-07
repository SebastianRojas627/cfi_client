import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { UserSession } from "../context/auth-types";

const LoadingRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserSession } = useAuth();

  useEffect(() => {
    const encodedAuth = searchParams.get("auth");

    if (!encodedAuth) {
      console.error("No auth param found");
      navigate("/error");
      return;
    }

    try {
      const decoded = atob(encodedAuth);
      const authData = JSON.parse(decoded);

      console.log(authData)

      const userSession: UserSession = {
        accessToken: authData.access_token,
        refreshToken: authData.refresh_token,
        userId: authData.userData.userId,
        fullName: authData.userData.fullName.trim(),
        modules: authData.systemData.modules,
        roles: authData.systemData.roles,
        permissions: authData.systemData.permissions,
        imageUser: authData.userData.imageUser,
        email: authData.userData.email,
        organismoId: authData.userData.unidad.organismoId,
        organismoFullName: authData.userData.unidad.organismoFullName,
        userName: authData.userData.username,
        organismoAbreviacion: authData.userData.unidad.abreviacion,
      };

      setTimeout(() => {
        navigate("/home");
      }, 1500);

      setUserSession(userSession);
    } catch (error) {
      console.error("Failed to decode auth token:", error);
      navigate("/error");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <CircularProgress size={60} />
      <Typography color='text.primary' variant="h6" mt={3}>
        Cargando el sistema Nexus...
      </Typography>
    </Box>
  );
};

export default LoadingRedirect;
