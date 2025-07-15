import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import { Urls } from "./utils/routes";
import Historial from "./views/Historial";
import ResultsPage from "./components/ResultsPage";
import CompleteRequestContainer from "./components/CompleteRequestContainer";
import LoadingRedirect from "./components/LoadingRedirect";
import { UserConfigView } from "./views/UserConfig";
import DocumentReport from "./views/DocumentReports";
import FreeSearchView from "./views/FreeSearch";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ErrorPage from "./views/ErrorPage";
import UnauthorizedPage from "./views/UnauthorizedPage";

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
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <CompleteRequestContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.FREE}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <FreeSearchView />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.HISTORY}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <Historial />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.PENDING}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <Historial />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.SETTINGS}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <UserConfigView />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.HOME}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.REQUESTS}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.REPORTS}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <DocumentReport />
                </ProtectedRoute>
              }
            />
            <Route
              path={Urls.RESULTS + "/:solicitudId"}
              element={
                <ProtectedRoute allowedRoles={["Administrador CFI"]}>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
