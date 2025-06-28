import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import {
  Home,
  About,
  Education,
  Work,
  Projects,
  Skills,
  Contact,
  Footer,
  Certifications,
  Events
} from 'components';

// Styles
import './App.css';

// Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',  // Deep purple
      light: '#b47cff',
      dark: '#3f1dcb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5ff',  // Cyan
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#757575',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      marginBottom: '1.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatePresence mode="wait">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
            <Sidebar />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                marginLeft: { xs: 0, md: '300px' },
                marginTop: { xs: '80px', md: 0 },
                width: { xs: '100%', md: 'calc(100% - 300px)' },
                padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                maxWidth: '100%',
                overflowX: 'hidden',
              }}
            >
              <Routes>
                <Route path="/" element={
                  <>
                    <Home />
                    <About />
                    <Skills />
                    <Work />
                    <Projects />
                    <Events />
                    <Education />
                    <Certifications />
                    <Contact />
                  </>
                } />
              </Routes>
              <Footer />
            </Box>
          </Box>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
