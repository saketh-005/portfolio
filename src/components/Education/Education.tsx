import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper, Divider, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string[];
  grade?: string;
  icon?: React.ReactNode;
}

const Education = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: 'BTech in Computer Science (Artificial Intelligence and Robotics)',
      institution: 'Vellore Institute of Technology',
      duration: '2023 - 2027',
      description: [
        'Specialization in Artificial Intelligence and Robotics',
        'Relevant Coursework: Data Structures, Algorithms, Machine Learning, Robotics, Computer Vision, Natural Language Processing',
        'Activities: Participating in technical events and hackathons',
      ],
    },
    {
      id: 2,
      degree: 'Intermediate (12th Grade)',
      institution: 'Sri Chaitanya Junior College, Hyderabad',
      duration: '2021 - 2023',
      grade: 'Percentage: 94.7%',
      description: [
        'Major: Mathematics, Physics, Chemistry (MPC)'
      ],
    },
    {
      id: 3,
      degree: '10th Grade',
      institution: 'Sri Chaitanya School, Hyderabad',
      duration: '2020 - 2021',
      grade: 'CGPA: 10/10',
      description: [],
    },
  ];

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      id="education"
      sx={{
        py: 8,
        px: isMobile ? '1rem' : '10%',
        backgroundColor: theme.palette.background.default,
        width: '100%',
        maxWidth: '1440px',
        mx: 'auto',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ marginBottom: '4rem' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  marginRight: '1.5rem',
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '2.5rem',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '1.5rem',
                    marginRight: '1rem',
                    flexWrap: 'wrap',
                    '&:after': {
                      content: 'none',
                    },
                  },
                  '&:after': {
                    content: '""',
                    display: 'block',
                    width: '200px',
                    height: '1px',
                    backgroundColor: theme.palette.primary.main,
                    marginLeft: '20px',
                    [theme.breakpoints.down('md')]: {
                      width: '100px',
                      marginLeft: '15px',
                    },
                  },
                }}
              >
                <Box component="span" sx={{ color: theme.palette.primary.main, mr: 1 }}>06.</Box> Education
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ 
                maxWidth: '600px',
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
                marginTop: '1rem'
              }}
            >
              My academic journey and educational qualifications that have shaped my knowledge and skills.
            </Typography>
          </Box>
        </motion.div>

        <Stack spacing={4} sx={{ width: '100%', position: 'relative' }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: '36px',
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: theme.palette.divider,
              zIndex: 1,
              display: isMobile ? 'none' : 'block',
            }}
          />
          
          {educationData.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              variants={item}
              style={{
                position: 'relative',
                zIndex: 2,
                paddingLeft: isMobile ? 0 : '80px',
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '74px',
                  height: '74px',
                  display: isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 0 4px ${theme.palette.background.default}, 0 0 0 7px ${theme.palette.primary.main}40`,
                  }}
                >
                  <SchoolIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
              </Box>
              
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: '8px',
                  backgroundColor: theme.palette.background.paper,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px -15px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                      <Box sx={{ mb: 1 }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {edu.degree}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            mb: 0.5,
                          }}
                        >
                          {edu.institution}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                        >
                          <span>{edu.duration}</span>
                          {edu.grade && (
                            <>
                              <span>•</span>
                              <span>{edu.grade}</span>
                            </>
                          )}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 1.5, borderColor: theme.palette.divider }} />
                      
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {edu.description.map((item, i) => (
                          <Typography 
                            key={i} 
                            component="li" 
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {item}
                          </Typography>
                        ))}
                      </Box>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Education;
