import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '6rem 1rem' : '2rem',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{
            fontFamily: '"Fira Code", monospace',
            marginBottom: '0.5rem',
            fontSize: isMobile ? '1rem' : '1.25rem',
          }}
        >
          Hello, I'm
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: isMobile ? '2.5rem' : '5rem',
            color: theme.palette.text.primary,
            marginBottom: '0.5rem',
            lineHeight: 1.1,
          }}
        >
          Saketh Jangala
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            fontSize: isMobile ? '1.25rem' : '1.75rem',
            color: theme.palette.text.secondary,
            margin: '0.5rem 0 1.5rem',
            lineHeight: 1.4,
          }}
        >
          Full Stack Developer | Python | JavaScript | React | Node.js
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Typography
          variant="body1"
          sx={{
            maxWidth: '600px',
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: theme.palette.text.secondary,
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          I'm a passionate Full Stack Developer with expertise in Python, JavaScript, and cloud technologies.
          I specialize in building scalable web applications and have a keen interest in cloud technologies and DevOps practices.
        </Typography>
      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ScrollLink to="contact" smooth={true} duration={500}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                border: `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Get In Touch
          </Button>
        </ScrollLink>
      </motion.div>
    </Box>
  );
};

export default Home;
