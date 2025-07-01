import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { Box, Typography } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

function App() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="background.default">
      <Box display="flex" alignItems="center" justifyContent="center" py={3} bgcolor="primary.main">
        <SportsCricketIcon sx={{ color: 'secondary.main', fontSize: 40, mr: 1 }} />
        <Typography variant="h4" color="white" fontWeight={700} letterSpacing={2}>
          BoundaryBox
        </Typography>
      </Box>
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
      <Box textAlign="center" py={2} bgcolor="background.paper" color="primary.main">
        <Typography variant="subtitle2">
          Secure the match like Surya did — with BoundaryBox
        </Typography>
      </Box>
    </Box>
  );
}

export default App; 