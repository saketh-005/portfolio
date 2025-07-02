import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  styled,
  Theme,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import GetAppIcon from '@mui/icons-material/GetApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Styled Components
const NavLink = styled('a')(({ theme }: { theme: Theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ResumeButton = styled('a')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 500,
  width: '100%',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
}));

interface NavItem {
  name: string;
  icon: string;
}

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface SidebarProps {
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ minimized, setMinimized, mode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showResumeAlert, setShowResumeAlert] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopMinimize = () => {
    setMinimized(!minimized);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResumeAlert(true);
  };

  const navItems: NavItem[] = [
    { name: 'About', icon: '👨\u200d💻' },
    { name: 'Skills', icon: '🛠️' },
    { name: 'Work', icon: '💼' },
    { name: 'Projects', icon: '💻' },
    { name: 'Events', icon: '🏆' },
    { name: 'Education', icon: '🎓' },
    { name: 'Certifications', icon: '📜' },
    { name: 'Contact', icon: '📧' },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <GitHubIcon />, url: 'https://github.com/saketh-005' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/saketh-jangala/' },
    { icon: <XIcon />, url: 'https://x.com/saketh_jangala' },
    { icon: <EmailIcon />, url: 'mailto:saketh.jangala@outlook.com' },
  ];

  const drawerContent = (minimized: boolean = false) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Theme Switcher & Minimize Button */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: minimized ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: minimized ? 1 : 0,
          mb: 2,
        }}
      >
        <IconButton onClick={toggleTheme} size="small" sx={{ ml: minimized ? 0 : 1 }}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton onClick={handleDesktopMinimize} size="small">
          {minimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      {/* Mobile Header */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Saketh J
        </Typography>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Profile Section */}
      <Box sx={{ textAlign: 'center', mb: 4, flexShrink: 0 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar
            src="/images/profile-photo.jpeg"
            alt="Saketh Jangala"
            sx={{
              width: { xs: 100, md: minimized ? 48 : 150 },
              height: { xs: 100, md: minimized ? 48 : 150 },
              margin: '0 auto 1rem',
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
              objectFit: 'cover',
              transition: 'width 0.3s, height 0.3s',
            }}
          />
        </motion.div>
        {!minimized && (
          <>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Saketh Jangala
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                mb: 2,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              <CodeIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> Computer Science Student
            </Typography>
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', mb: 3 }}>
              {socialLinks.map((social: SocialLink, index: number) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {navItems.map((item: NavItem) => (
          <motion.div
            key={item.name}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            style={{ marginBottom: '0.5rem' }}
          >
            <NavLink
              href={`#${item.name.toLowerCase()}`}
              onClick={() => isMobile && handleDrawerToggle()}
              sx={{ justifyContent: minimized ? 'center' : 'flex-start', padding: minimized ? '0.75rem' : '0.75rem 1rem' }}
            >
              <span style={{ marginRight: minimized ? 0 : '12px', fontSize: '1.25rem' }}>{item.icon}</span>
              {!minimized && <Typography variant="body1">{item.name}</Typography>}
            </NavLink>
          </motion.div>
        ))}
      </Box>

      {/* Resume Button */}
      <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}`, width: '100%' }}>
        {!minimized && (
          <ResumeButton
            href="#"
            onClick={handleResumeClick}
            sx={{ width: '100%' }}
          >
            <GetAppIcon />
            <span>Download Resume</span>
          </ResumeButton>
        )}
        <Snackbar
          open={showResumeAlert}
          autoHideDuration={6000}
          onClose={() => setShowResumeAlert(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowResumeAlert(false)}
            severity="info"
            sx={{ width: '100%' }}
          >
            Thank you for your interest! My resume will be available soon.
            Please feel free to connect with me on LinkedIn or via email in the meantime.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: 1100,
          height: '60px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Saketh J
          </Typography>
        </Box>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: minimized ? '60px' : '300px' },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          padding: minimized ? '1rem 0.5rem' : '2rem 1.5rem',
          overflowY: 'auto',
          zIndex: 1000,
          transition: 'width 0.3s, padding 0.3s',
        }}
      >
        {drawerContent(minimized)}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '280px',
            backgroundColor: theme.palette.background.paper,
            padding: '1.5rem',
          },
        }}
      >
        {drawerContent()}
      </Drawer>
    </>
  );
};

export default Sidebar;
