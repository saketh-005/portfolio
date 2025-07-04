import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const About = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('md'));

  const skills = [
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'AWS',
    'Docker',
    'Kubernetes',
    'Git',
    'SQL',
    'MongoDB',
    'REST APIs',
    'Microservices',
    'CI/CD',
    'Terraform'
  ];

  return (
    <Box
      id="about"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: 0,
        pb: 0,
        px: { xs: 3, md: 4, lg: 6 },
        scrollMarginTop: '30px',
        maxWidth: '1400px',
        mx: 'auto',
        width: '100%',
      }}
    >
      <SectionHeader 
        title="About Me"
        subtitle="Full Stack Developer with a passion for building scalable web applications and solving complex problems."
        gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 6 }}>
        <Box>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant="body1"
              sx={{
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
              }}
            >
              Hello! I'm Saketh Jangala, a passionate developer with a strong foundation in both front-end and back-end technologies. I have expertise in building scalable web applications and solving complex problems through code. I'm particularly fascinated by the potential of artificial intelligence and machine learning to transform the way we interact with technology.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
              }}
            >
              I have hands-on experience in developing robust solutions using modern technologies. My technical expertise includes building responsive web applications, working with databases, and implementing efficient algorithms. I'm particularly interested in exploring AI/ML applications and how they can be integrated into modern web solutions to create more intelligent and intuitive user experiences.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '2rem',
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
              }}
            >
              I'm actively looking for full-time opportunities in software development where I can apply my skills and continue to grow as a developer. I'm particularly interested in roles that involve AI/ML integration, data analysis, or building intelligent systems. When I'm not coding, I enjoy diving into machine learning research papers, working on personal AI projects, and contributing to open-source communities.
            </Typography>

            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.25rem',
                  marginBottom: '1.5rem',
                  color: theme.palette.text.primary,
                }}
              >
                Here are a few technologies I've been working with recently:
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1 }}>
                {skills.map((skill, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <Box
                        sx={{
                          width: '5px',
                          height: '5px',
                          backgroundColor: theme.palette.primary.main,
                          marginRight: '1rem',
                          borderRadius: '50%',
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: '0.9rem',
                        }}
                      >
                        {skill}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                borderRadius: '5px',
                overflow: 'hidden',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: '5px',
                  top: '20px',
                  left: '20px',
                  zIndex: -1,
                  transition: 'all 0.25s ease-in-out',
                },
                '&:hover:before': {
                  top: '15px',
                  left: '15px',
                },
              }}
            >
              <Box
                component="img"
                src="/profile.jpg"
                alt="Profile"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  filter: 'grayscale(100%) contrast(1) brightness(90%)',
                  transition: 'all 0.25s ease-in-out',
                  '&:hover': {
                    filter: 'none',
                  },
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
