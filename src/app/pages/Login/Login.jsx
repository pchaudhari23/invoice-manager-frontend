import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  InputAdornment,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { login } from "../../../network/userapi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const [userCredentials, setUserCredentials] = useState(initialState);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `USERNAME: ${userCredentials.username} & Password: ${userCredentials.password}`
    );
    let response = await login(userCredentials);
    if (response.success) {
      console.log("Login successful, token:", response.token);
      navigate("/dashboard");
    } else {
      console.error("Login failed:", response.error);
      alert(`Login failed: ${response.error}`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 370,
          borderRadius: 4,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Typography
          variant="h4"
          mb={1.5}
          align="center"
          fontWeight={700}
          color="primary"
        >
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle2"
          mb={3}
          align="center"
          color="text.secondary"
        >
          Please login to your account
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Username"
            name="username"
            value={userCredentials.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userCredentials.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 600,
              letterSpacing: 1,
              borderRadius: 2,
              fontSize: "1rem",
            }}
          >
            Login
          </Button>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            New user?{" "}
            <Link
              href="/signup"
              underline="hover"
              color="primary"
              fontWeight={500}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
