import React from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const socialLinks = [
    { 
      icon: <GitHubIcon />, 
      url: 'https://github.com/saketh-005',
      label: 'GitHub',
    },
    { 
      icon: <LinkedInIcon />, 
      url: 'https://www.linkedin.com/in/saketh-jangala/',
      label: 'LinkedIn',
    },
    { 
      icon: <XIcon />, 
      url: 'https://x.com/saketh_jangala',
      label: 'X (Twitter)',
    },
    { 
      icon: <EmailIcon />, 
      url: 'mailto:saketh.jangala@outlook.com',
      label: 'Email',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        padding: isMobile ? '2rem 1.5rem' : '3rem 10%',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: isMobile ? '1.5rem' : 0,
            }}
          >
            © {new Date().getFullYear()} Saketh Jangala. All rights reserved.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IconButton
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
