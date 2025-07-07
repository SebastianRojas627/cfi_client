import { Box, Container, Toolbar, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  const theme = useTheme();
  
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {}
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
