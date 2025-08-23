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
import Person from "@mui/icons-material/Person";
import Email from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { signup } from "../../../network/userapi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    let response = await signup(userData);
    if (response.success) {
      console.log("Signup successful: ", response);
      navigate("/");
    } else {
      console.error("Login failed:", response.error);
      alert(`Login failed: ${response.error}`);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
      sx={{ padding: 2 }}
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
          Create Account
        </Typography>
        <Typography
          variant="subtitle2"
          mb={3}
          align="center"
          color="text.secondary"
        >
          Please fill in the details to sign up
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Surname"
            name="surname"
            value={userData.surname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
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
            Sign Up
          </Button>
        </form>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link href="/" underline="hover" color="primary" fontWeight={500}>
              Back to Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
