import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import { Urls } from "./utils/routes";
import Historial from "./views/Historial";
import ResultsPage from "./components/ResultsPage";
import CompleteRequestContainer from "./components/CompleteRequestContainer";
import FreeSearchForm from "./components/FreeSearchForm";
import LoadingRedirect from "./components/LoadingRedirect";
import { UserConfigView } from "./views/UserConfig";
import DocumentReport from "./views/DocumentReports";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      mode: "light",
      primary: {
        main: "#0D47A1",
        light: "#5472D3",
        dark: "#002171",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#C62828",
        light: "#FF5F52",
        contrastText: "#ffffff",
      },
      info: {
        main: "#0288D1",
      },
      success: {
        main: "#2E7D32",
      },
      warning: {
        main: "#F9A825",
      },
      background: {
        default: "#F5F7FA",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#616161",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/auth/initialize" element={<LoadingRedirect />} />
            <Route
              path={Urls.COMPLETE + "/:solicitudId?"}
              element={<CompleteRequestContainer />}
            />
            <Route path={Urls.FREE} element={<FreeSearchForm />} />
            <Route path={Urls.HISTORY} element={<Historial />} />
            <Route path={Urls.PENDING} element={<Historial />} />
            <Route path={Urls.SETTINGS} element={<UserConfigView />} />
            <Route path={Urls.HOME} element={<Dashboard />} />
            <Route path={Urls.REQUESTS} element={<Dashboard />} />
            <Route path={Urls.REPORTS} element={<DocumentReport />} />
            <Route
              path={Urls.RESULTS + "/:solicitudId"}
              element={<ResultsPage />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
