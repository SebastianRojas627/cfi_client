import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotifications } from "../hooks/useNotifications";
import { useNavigate } from "react-router";
import { markNotificationComplete } from "../api/solicitudService";

export default function NotificationsBell() {
  const notifications = useNotifications("Investigador Prueba");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = async (solicitudId: string, notification_id: number) => {
    handleClose();
    await markNotificationComplete(notification_id)
    navigate(`/complete/${solicitudId}`);
    window.location.reload()
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>No hay notificaciones</MenuItem>
        ) : (
          notifications.map((n, index) => (
            <MenuItem
              key={index}
              onClick={() => handleRedirect(n.solicitud_informacion_id, n.notification_id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.5,
                borderRadius: 1,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                  <NotificationsIcon sx={{ fontSize: 20 }} />
                </Avatar>
              </ListItemIcon>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {n.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Solicitud ID: {n.solicitud_informacion_id}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
