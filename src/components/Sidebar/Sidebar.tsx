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
  Theme
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import GetAppIcon from '@mui/icons-material/GetApp';

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

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
    { icon: <TwitterIcon />, url: 'https://twitter.com/yourusername' },
    { icon: <EmailIcon />, url: 'mailto:saketh.jangala@outlook.com' },
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
              margin: '0 auto 1rem',
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
              objectFit: 'cover',
            }}
          />
        </motion.div>
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
            >
              <span style={{ marginRight: '12px', fontSize: '1.25rem' }}>{item.icon}</span>
              <Typography variant="body1">{item.name}</Typography>
            </NavLink>
          </motion.div>
        ))}
      </Box>

      {/* Resume Button */}
      <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ width: '100%' }}
        >
          <ResumeButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GetAppIcon />
            <span>Download CV</span>
          </ResumeButton>
        </motion.div>
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
          width: { xs: 0, md: '300px' },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          padding: '2rem 1.5rem',
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        {drawerContent}
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
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
