// Dashboard.tsx
import { ReactNode, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const mockSummary = {
  pending: 4,
  total: 25,
  fulfilled: 21,
};

const mockGraphData = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split("T")[0],
    requests: Math.floor(Math.random() * 5),
  };
});

const mockRecentRequests = [
  {
    id: 101,
    title: "Request about subject A",
    date: "2025-04-10",
    status: "Pending",
  },
  {
    id: 100,
    title: "Request about subject B",
    date: "2025-04-09",
    status: "Fulfilled",
  },
  {
    id: 99,
    title: "Request about subject C",
    date: "2025-04-08",
    status: "Fulfilled",
  },
  {
    id: 98,
    title: "Request about subject D",
    date: "2025-04-07",
    status: "Pending",
  },
  {
    id: 97,
    title: "Request about subject E",
    date: "2025-04-06",
    status: "Fulfilled",
  },
];

const SummaryCard = ({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: ReactNode;
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      backgroundColor: color,
      color: "white",
    }}
  >
    <Box mr={2}>{icon}</Box>
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Box>
  </Paper>
);

const statusPieData = [
  { name: "Pending", value: mockSummary.pending },
  { name: "Fulfilled", value: mockSummary.fulfilled },
  {
    name: "Others",
    value: mockSummary.total - mockSummary.pending - mockSummary.fulfilled,
  },
];
const pieColors = ["#f44336", "#4caf50", "#9e9e9e"];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  const navigate = useNavigate();

  const onNewRequestClick = () => {
    navigate('/form')
  }

  const filteredGraphData = useMemo(() => {
    const today = new Date();
    return mockGraphData.filter((item) => {
      const itemDate = new Date(item.date);
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
    });
  }, [timeRange]);

  const handleTimeRangeChange = (
    _: any,
    newValue: "week" | "month" | "year"
  ) => {
    if (newValue !== null) setTimeRange(newValue);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Dashboard</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onNewRequestClick}>
          New Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryCard
            title="Pending Requests"
            value={mockSummary.pending}
            color="#f44336"
            icon={<PendingIcon fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryCard
            title="Fulfilled Requests"
            value={mockSummary.fulfilled}
            color="#4caf50"
            icon={<FulfilledIcon fontSize="large" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SummaryCard
            title="Total Requests"
            value={mockSummary.total}
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
              <Typography variant="h6">Requests Over Time</Typography>
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={handleTimeRangeChange}
                size="small"
              >
                <ToggleButton value="week">This Week</ToggleButton>
                <ToggleButton value="month">This Month</ToggleButton>
                <ToggleButton value="year">This Year</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredGraphData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="requests"
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
              Status Breakdown
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
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value} Requests`, "Count"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Last 5 Requests
            </Typography>
            <List>
              {mockRecentRequests.map((req) => (
                <ListItem key={req.id} divider>
                  <ListItemText
                    primary={req.title}
                    secondary={`Date: ${req.date} | Status: ${req.status}`}
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
