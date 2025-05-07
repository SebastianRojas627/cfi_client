import SearchView from "./components/SearchView";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./views/Dashboard";
import { Urls } from "./utils/routes";
import Historial from "./views/Historial";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#fefefe",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path={Urls.FORM} element={<SearchView />} />
            <Route path={Urls.HISTORY} element={<Historial />} />
            <Route path={Urls.PENDING} element={<SearchView />} />
            <Route path={Urls.HOME} element={<Dashboard />} />
            <Route path={Urls.REQUESTS} element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
