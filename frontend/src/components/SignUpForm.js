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
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

const StyledAvatar = styled(Avatar)({
  margin: "8px",
  backgroundColor: "#2196F3",
});

const StyledTextField = styled(TextField)({
  margin: "10px",
  width: "100%",
});

const StyledButton = styled(Button)({
  margin: "20px 0",
  width: "100%",
  backgroundColor: "#2196F3",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565C0",
  },
});

const StyledError = styled("p")({
  color: "red",
  marginTop: "10px",
});

const StyledLoginLink = styled(Link)({
  marginTop: "20px",
  textDecoration: "none",
  color: "#2196F3",
  fontWeight: "bold",
  "&:hover": {
    color: "#1565C0",
  },
});

const SignupForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://assignment-ox1i.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.error || "Signup failed");
      }
      history.push("/dummy-page");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Internal Server Error");
    }

    setLoading(false);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <StyledTextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledTextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton
          variant="contained"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </StyledButton>
        {error && <StyledError>{error}</StyledError>}
        <StyledLoginLink to="/login">
          Already have an account? Login here
        </StyledLoginLink>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupForm;
