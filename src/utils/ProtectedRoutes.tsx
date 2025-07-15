import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <img src="/Nexus.jpg" alt="Nexus" style={{ width: 120 }} />
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/error" replace />;
  }

  if (
    allowedRoles &&
    !user.roles.some((role) => allowedRoles.includes(role.name))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
