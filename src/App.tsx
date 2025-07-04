import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
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
const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: '#7c4dff',
      light: '#b47cff',
      dark: '#3f1dcb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: mode === 'dark'
      ? { default: '#0a0a0a', paper: '#121212' }
      : { default: '#fafafa', paper: '#fff' },
    text: mode === 'dark'
      ? { primary: '#ffffff', secondary: '#b3b3b3', disabled: '#757575' }
      : { primary: '#222', secondary: '#555', disabled: '#aaa' },
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
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '4px',
    //       textTransform: 'none',
    //       fontWeight: 500,
    //       padding: '8px 24px',
    //     },
    //   },
    // },
  },
});

function App() {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatePresence mode="wait">
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Topbar/Header for desktop, Sidebar for mobile */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Header mode={mode} toggleTheme={toggleTheme} />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Sidebar minimized={sidebarMinimized} setMinimized={setSidebarMinimized} mode={mode} toggleTheme={toggleTheme} />
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                marginTop: { xs: '80px', md: '80px' },
                width: '100%',
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
