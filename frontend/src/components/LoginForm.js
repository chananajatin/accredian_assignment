import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Link,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router-dom";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const StyledPaper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
});

const StyledTextField = styled(TextField)({
  margin: "10px",
  width: "100%",
});

const StyledButton = styled(Button)({
  margin: "20px 0",
  width: "100%",
  backgroundColor: "#1976D2",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565C0",
  },
});

const StyledLink = styled(Link)({
  marginTop: "20px",
  textDecoration: "none",
  color: "#1976D2",
  fontWeight: "bold",
  "&:hover": {
    color: "#1565C0",
  },
});

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://assignment-ox1i.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        history.push("/dummy-page");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Internal Server Error");
    }

    setLoading(false);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <StyledTextField
          label="Username or Email"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </StyledButton>
        {error && <Typography color="error">{error}</Typography>}
        <StyledLink href="#" variant="body2">
          Forgot Password?
        </StyledLink>
        <StyledLink href="/signup" variant="body2">
          Don't have an account? Sign up here
        </StyledLink>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginForm;
