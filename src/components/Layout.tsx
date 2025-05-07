import { Box, Container, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {}
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
