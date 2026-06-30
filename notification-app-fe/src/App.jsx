import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import NotificationsPage from './pages/NotificationsPage';

// Custom Material UI Theme with modern styles and clean typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a56db', // Indigo Blue
      dark: '#1e40af',
      light: '#60a5fa',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ed6c02', // Vibrant Amber/Orange
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc', // Very soft light grey/blue
      paper: '#ffffff'
    },
    text: {
      primary: '#0f172a', // Deep charcoal
      secondary: '#475569' // Cool slate grey
    },
    action: {
      hover: 'rgba(26, 86, 219, 0.04)'
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif' },
    h2: { fontFamily: '"Outfit", sans-serif' },
    h3: { fontFamily: '"Outfit", sans-serif' },
    h4: { fontFamily: '"Outfit", sans-serif' },
    h5: { fontFamily: '"Outfit", sans-serif' },
    h6: { fontFamily: '"Outfit", sans-serif' },
    subtitle1: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.03)'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            backgroundColor: 'background.default' 
          }}
        >
          <Navbar />
          <NotificationsPage />
        </Box>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
