import { useEffect, useMemo, useState } from "react";
import {
  getCalendarCount,
  getSolicitudesCount,
  ultimasSolicitues,
} from "../api/solicitudService";
import {
  CalendarioCount,
  ConteoSolicitudes,
  SolicitudInformacion,
} from "../api/types";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { CountCard } from "../components/CountCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import TotalIcon from "@mui/icons-material/Assignment";
import FulfilledIcon from "@mui/icons-material/CheckCircle";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );
  const [count, setCount] = useState<ConteoSolicitudes | undefined>();
  const [calendar, setCalendar] = useState<CalendarioCount[] | undefined>();
  const [ultimasSolicitudes, setUltimasSolicitudes] = useState<
    SolicitudInformacion[] | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [c, cal, last] = await Promise.all([
        getSolicitudesCount(),
        getCalendarCount(timeRange),
        ultimasSolicitues(),
      ]);
      setCount(c);
      setCalendar(cal);
      setLoading(false);
      setUltimasSolicitudes(last);
    };

    fetchData();
  }, [timeRange]);

  const statusPieData = [
    { name: "Pendientes", value: count?.pendientes },
    { name: "Resueltas", value: count?.completadas },
  ];

  const pieColors = ["#f44336", "#4caf50", "#9e9e9e"];

  const filteredGraphData = useMemo(() => {
    const today = new Date();
    return (calendar ?? [])
      .filter((item) => {
        const itemDate = new Date(item.fecha);
        if (timeRange === "week") {
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          return itemDate >= lastWeek;
        } else if (timeRange === "month") {
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          return itemDate >= lastMonth;
        } else {
          const lastYear = new Date();
          lastYear.setFullYear(today.getFullYear() - 1);
          return itemDate >= lastYear;
        }
      })
      .map((item) => ({
        ...item,
        fecha: new Date(item.fecha).toISOString().split("T")[0],
      }));
  }, [calendar, timeRange]);

  const handleTimeRangeChange = (
    _: any,
    newValue: "week" | "month" | "year"
  ) => {
    if (newValue !== null) setTimeRange(newValue);
  };

  if (loading) return null;

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CountCard
            title="Solicitudes Pendientes"
            value={count!.pendientes}
            color="#f44336"
            icon={<PendingIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CountCard
            title="Solicitudes Resueltas"
            value={count!.completadas}
            color="#4caf50"
            icon={<FulfilledIcon fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CountCard
            title="Todas las Solicitudes"
            value={count!.totales}
            color="#2196f3"
            icon={<TotalIcon fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Solicitudes en el tiempo</Typography>
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={handleTimeRangeChange}
                size="small"
              >
                <ToggleButton value="week">Semana</ToggleButton>
                <ToggleButton value="month">Mes</ToggleButton>
                <ToggleButton value="year">Año</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredGraphData}>
                <XAxis
                  dataKey="fecha"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip
                  labelFormatter={(label) =>
                    `Fecha: ${new Date(label).toLocaleDateString()}`
                  }
                  formatter={(value) => [`${value}`, "Solicitudes"]}
                />
                <Line
                  type="monotone"
                  dataKey="cantidad"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Desglose Estado
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} Solicitudes`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Últimas 5 Solicitudes
            </Typography>
            <List>
              {ultimasSolicitudes!.map((req) => (
                <ListItem key={req.solicitud_informacion_id} divider>
                  <ListItemText
                    primary={
                      req.consulta_libre
                        ? `${req.numero_caso} - Consulta Libre`
                        : `${req.numero_caso} - ${req.delito} - ${req.numero_caso_unidad}`
                    }
                    secondary={`Fecha: ${new Date(req.fecha_solicitud).toISOString().split("T")[0]} | Estado: ${
                      req.completado ? "Completado" : "Pendiente"
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
