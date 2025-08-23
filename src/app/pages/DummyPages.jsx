import AppPage from "../components/AppPage/AppPage";
import Typography from "@mui/material/Typography";

export const Clients = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Clients
        </Typography>
      </div>
    </AppPage>
  );
};

export const Estimates = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Estimates
        </Typography>
      </div>
    </AppPage>
  );
};

export const Payments = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Payments
        </Typography>
      </div>
    </AppPage>
  );
};

export const Expenses = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Expenses
        </Typography>
      </div>
    </AppPage>
  );
};

export const Profile = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Profile
        </Typography>
      </div>
    </AppPage>
  );
};

export const Settings = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Settings & Privacy
        </Typography>
      </div>
    </AppPage>
  );
};

export const Help = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Help & Support
        </Typography>
      </div>
    </AppPage>
  );
};

export const Logout = () => {
  return (
    <AppPage title={""} description={""}>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Logout
        </Typography>
      </div>
    </AppPage>
  );
};

const DummyPages = {
  Clients,
  Estimates,
  Payments,
  Expenses,
  Profile,
  Settings,
  Help,
  Logout,
};

export default DummyPages;
