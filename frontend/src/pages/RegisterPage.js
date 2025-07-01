import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Box, Link, Alert } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // TODO: Replace with real API call
      if (username && password) {
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Please fill all fields');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ maxWidth: 400, p: 4, boxShadow: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <SportsCricketIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="primary">
            BoundaryBox
          </Typography>
        </Box>
        <Typography variant="subtitle1" align="center" color="text.secondary" mb={2}>
          Secure the match like Surya did
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 700 }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover" color="primary">
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default RegisterPage; 