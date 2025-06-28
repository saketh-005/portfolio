import React from 'react';
import { Box, Typography, Avatar, Divider, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import GetAppIcon from '@mui/icons-material/GetApp';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { name: 'About', icon: '👨‍💻' },
    { name: 'Education', icon: '🎓' },
    { name: 'Skills', icon: '🛠️' },
    { name: 'Work', icon: '💼' },
    { name: 'Projects', icon: '💻' },
    { name: 'Certifications', icon: '🏆' },
    { name: 'Contact', icon: '📧' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/saketh-005' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/saketh-jangala/' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/yourusername' },
    { icon: <EmailIcon />, url: 'mailto:saketh.jangala@outlook.com' },
  ];

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '300px',
        height: isMobile ? 'auto' : '100vh',
        position: isMobile ? 'relative' : 'fixed',
        left: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      {/* Profile Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar
            src="/images/profile-photo.jpeg"
            alt="Saketh Jangala"
            sx={{
              width: 150,
              height: 150,
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
            mb: 2
          }}
        >
          <CodeIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} /> Computer Science Student
        </Typography>
        
        {/* Social Links */}
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', mb: 2 }}>
          {socialLinks.map((social, index) => (
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
        
        {/* Download CV Button */}
        <motion.a
          href="/path-to-your-cv.pdf"
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.5rem',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GetAppIcon sx={{ mr: 0.5 }} /> Download CV
        </motion.a>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Navigation */}
      <Box component="nav" sx={{ mt: 3 }}>
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            href={`#${item.name.toLowerCase()}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.8rem 1rem',
              margin: '0.5rem 0',
              borderRadius: '6px',
              color: theme.palette.text.primary,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ 
              backgroundColor: theme.palette.action.hover,
              paddingLeft: '1.5rem',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <Typography variant="body1">{item.name}</Typography>
          </motion.a>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
