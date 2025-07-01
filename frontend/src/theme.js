import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8', // Indian cricket blue
      light: '#63a4ff', // sky blue accent
      dark: '#005cb2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // orange accent
    },
    background: {
      default: '#f4f8fb',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
});

export default theme; 