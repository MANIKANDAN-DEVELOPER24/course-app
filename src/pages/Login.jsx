import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ setUser }) {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For registration success

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        // Login flow
        const res = await api.post("login/", { username, password });
        const { access, refresh } = res.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        const profileRes = await api.get("current-user/", {
          headers: { Authorization: `Bearer ${access}` },
        });

        setUser(profileRes.data);
        localStorage.setItem("welearn_user", JSON.stringify(profileRes.data));
        nav("/");
      } else {
        // Register flow (role automatically set as 'user')
        await api.post("register/", { username, email, password, role: "user" });

        // Show success message and auto-fill login form
        setSuccess("Registration successful! You can now login.");
        setIsLogin(true);          // Switch to login
        setPassword("");           // Clear password field
        // username and email remain filled for convenience
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        (isLogin ? "Login failed" : "Registration failed")
      );
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setEmail("");
    setPassword("");
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ maxWidth: 520, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {isLogin ? "Login" : "Register"}
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>

      <Typography sx={{ mt: 2, textAlign: "center" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button
          variant="text"
          onClick={handleToggle}
          sx={{ textTransform: "none" }}
        >
          {isLogin ? "Create Account" : "Login"}
        </Button>
      </Typography>
    </Box>
  );
}
