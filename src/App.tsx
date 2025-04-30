import SearchView from "./components/SearchView";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./views/Dashboard";

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
            <Route path="/form" element={<SearchView />} />
            <Route path="/history" element={<SearchView />} />
            <Route path="/pending" element={<SearchView />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
