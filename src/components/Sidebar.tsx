import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import { Urls } from "../utils/routes";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Role } from "../context/auth-types";
import UserAvatarMenu from "./AvatarMenu";
import SearchIcon from "@mui/icons-material/Search";
import IncompleteCircleIcon from "@mui/icons-material/IncompleteCircle";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "react-router-dom";
import NotificationsBell from "./NotificationsBell";

const drawerWidth = 240;

const sidebarLinks = [
  { text: "Home", url: Urls.HOME, icon: <HomeIcon /> },
  {
    text: "Completer Solicitud Pendiente",
    url: Urls.COMPLETE,
    icon: <IncompleteCircleIcon />,
  },
  { text: "Realizar Busqueda Libre", url: Urls.FREE, icon: <SearchIcon /> },
  {
    text: "Historial de Solicitudes",
    url: Urls.HISTORY,
    icon: <PendingIcon />,
  },
  //  {
  //    text: "Peticiones Externas",
  //    url: Urls.REQUESTS,
  //    icon: <ArrowOutwardIcon />,
  //  },
  { text: "Reportes", url: Urls.REPORTS, icon: <TaskIcon /> },
];

const moduleIconMap: Record<string, React.ReactNode> = {
  HOME: <HomeIcon />,
  COMPLETE: <IncompleteCircleIcon />,
  FREE: <SearchIcon />,
  HISTORY: <PendingIcon />,
  REPORTS: <TaskIcon />,
  SETTINGS: <SettingsIcon />,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState<Role[]>([]);
  const [photo, setPhoto] = useState("");
  // const [sidebarLinks, setSidebarLinks] = useState<
  //   { text: string; url: string; icon: React.ReactNode }[]
  // >([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user, loading } = useAuth();
  const location = useLocation();
  const isSettingsActive = location.pathname === "/settings";

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setRole(user.roles);
      setPhoto(user.imageUser);

      /*
      const linksFromModules = user.modules.map((module) => ({
        text: module.name,
        url: Urls[module.name as keyof typeof Urls],
        icon: moduleIconMap[module.name] || <HomeIcon />,
      }));
      setSidebarLinks(linksFromModules);
      */
    }
  }, [user]);

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box
            component="img"
            src="\Nexus.jpg"
            alt="Nexus Logo"
            sx={{
              height: 40,
              width: "auto",
              mr: 2,
              borderRadius: 1,
            }}
          />
          <Typography
            color="primary.contratText"
            variant="h6"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Sistema NEXUS - CFI
          </Typography>
          <NotificationsBell />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography color="text.contratText" variant="h6">
              {userName}
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.2,
                py: 0.3,
                backgroundColor: "grey.800",
                color: "common.white",
                fontSize: "0.75rem",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {role[0]?.name}
            </Box>
          </Box>
          <UserAvatarMenu photo={photo} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: theme.palette.primary.main }}>
          <Typography
            color="#ffffff"
            variant="h6"
            component="h3"
            sx={{
              p: 2,
              textAlign: "center",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            <strong>MENU NEXUS</strong>
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarLinks.map((item, index) => {
            const isActive = location.pathname === item.url;
            if (loading) return null;
            return (
              <Box key={index}>
                <ListItemButton
                  onClick={() => navigate(item.url)}
                  sx={{
                    alignItems: "center",
                    backgroundColor: isActive ? "grey.300" : "inherit",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: isActive ? "grey.300" : "grey.200",
                    },
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={
                      open
                        ? {
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }
                        : {}
                    }
                  />
                </ListItemButton>
                <Divider sx={{ my: 1 }} />
              </Box>
            );
          })}
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            pb: 1,
          }}
        >
          <Divider />
          <ListItemButton
            onClick={() => navigate("/settings")}
            sx={{
              borderRadius: 1,
              backgroundColor: isSettingsActive ? "grey.300" : "inherit",
              "&:hover": {
                backgroundColor: isSettingsActive ? "grey.300" : "grey.100",
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </Box>
      </Drawer>
    </Box>
  );
}
