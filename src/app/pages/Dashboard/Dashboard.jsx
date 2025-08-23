import AppPage from "../../components/AppPage/AppPage";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  return (
    <AppPage title={""} description={""}>
      <Typography variant="subtitle1" gutterBottom>
        Dashboard
      </Typography>
      <Box
        minHeight="100vh"
        bgcolor="linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={6}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 4,
            width: 420,
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DashboardIcon color="primary" sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" fontWeight={700} color="primary">
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              Welcome to your Invoice Manager!
            </Typography>
          </Box>
        </Paper>
        <Grid container spacing={3} justifyContent="center" maxWidth={900}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                background: "#f7fafc",
                transition: "0.2s",
                "&:hover": { boxShadow: 6, background: "#e3f2fd" },
              }}
            >
              <ReceiptLongIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                View Invoices
              </Typography>
              <Typography color="text.secondary" mb={2}>
                See all your invoices in one place.
              </Typography>
              <Button variant="contained" color="primary" href="/invoices">
                Go to Invoices
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                background: "#f7fafc",
                transition: "0.2s",
                "&:hover": { boxShadow: 6, background: "#e3f2fd" },
              }}
            >
              <PersonIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="h6" fontWeight={600}>
                Profile
              </Typography>
              <Typography color="text.secondary" mb={2}>
                Manage your account and settings.
              </Typography>
              <Button variant="outlined" color="primary" href="/profile">
                Go to Profile
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AppPage>
  );
};

export default Dashboard;
