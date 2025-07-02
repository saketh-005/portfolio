import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Paper, 
  Button, 
  Chip,
  IconButton,
  Collapse,
  Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Experience {
  id: number;
  role: string;
  company: string;
  logo?: string; // Path to the company logo in the public folder
  duration: string;
  description: string[];
  skills: string[];
  isCurrent?: boolean; // To help with sorting current positions
  startDate: string; // For proper sorting (format: 'YYYY-MM')
  endDate: string; // For proper sorting (format: 'YYYY-MM' or 'Present')
}

const experiences: Experience[] = [
  // Most Recent Position
  {
    id: 1,
    role: 'Backend Developer Intern',
    company: 'VitaData',
    logo: '/logos/vitadata-logo.png',
    duration: 'May 2025 - Present',
    description: [
      'Design and develop robust, scalable, and secure server-side applications using Django',
      'Build and maintain RESTful APIs for seamless frontend-backend integration',
      'Manage database architecture and optimize queries for performance',
      'Ensure application security and implement best practices for data protection',
      'Collaborate with frontend developers to integrate user-facing elements'
    ],
    skills: ['Django', 'Django REST Framework', 'Python', 'RESTful APIs', 'Database Management', 'Backend Development'],
    isCurrent: true,
    startDate: '2025-05',
    endDate: 'Present'
  },
  // Second Position
  {
    id: 2,
    role: 'Artificial Intelligence Research Intern',
    company: 'Coding Jr',
    logo: '/logos/codingjr-logo.png',
    duration: 'Apr 2025 - Present',
    description: [
      'Conduct research on state-of-the-art AI/ML algorithms and techniques',
      'Develop and implement machine learning models for various applications',
      'Collaborate with the research team to publish findings and contribute to open-source projects',
      'Optimize model performance and efficiency for production deployment'
    ],
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow/PyTorch', 'Research', 'AI/ML'],
    isCurrent: true,
    startDate: '2025-04',
    endDate: 'Present'
  }
];

// Sort experiences: current positions first (by start date), then previous positions (by end date, newest first)
const sortedExperiences = [...experiences].sort((a, b) => {
  // Both are current positions, sort by start date (newest first)
  if (a.isCurrent && b.isCurrent) {
    return b.startDate.localeCompare(a.startDate);
  }
  // Only a is current
  if (a.isCurrent) return -1;
  // Only b is current
  if (b.isCurrent) return 1;
  // Neither is current, sort by end date (newest first)
  return b.endDate.localeCompare(a.endDate);
});

const Work = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedExp(expandedExp === id ? null : id);
  };

  return (
    <Box
      id="work"
      sx={{
        pt: 0,
        pb: 0,
        px: { xs: 3, md: 4, lg: 6 },
        bgcolor: 'background.default',
        scrollMarginTop: '30px',
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      <SectionHeader 
        title="Work Experience"
        subtitle="My professional journey and contributions"
        gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >

        <Box sx={{ position: 'relative' }}>
          {/* Timeline line */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: isMobile ? '24px' : '50%',
              width: '2px',
              backgroundColor: theme.palette.divider,
              transform: 'translateX(-50%)',
              zIndex: 1,
              [theme.breakpoints.down('md')]: {
                left: '24px',
              },
            }}
          />

          {sortedExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                position: 'relative',
                width: isMobile ? '100%' : '50%',
                padding: isMobile ? '0 0 3rem 3rem' : index % 2 === 0 ? '0 0 3rem 0' : '0 0 3rem 0',
                marginLeft: isMobile ? '0' : index % 2 === 0 ? '0' : '50%',
                paddingLeft: isMobile ? '3rem' : index % 2 === 0 ? '0' : '3rem',
                paddingRight: isMobile ? '0' : index % 2 === 0 ? '3rem' : '0',
              }}
            >
              <Box
                onClick={() => toggleExpand(exp.id)}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '8px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
                    borderColor: theme.palette.primary.main,
                    '& .timeline-dot': {
                      transform: 'scale(1.2)',
                      boxShadow: `0 0 0 4px ${theme.palette.background.default}, 0 0 0 7px ${theme.palette.primary.main}40`,
                    },
                    '& .work-skills span': {
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                    },
                    '& .work-description li::marker': {
                      color: theme.palette.primary.main,
                    }
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                  },
                  '&[aria-expanded="true"] .work-role': {
                    color: theme.palette.primary.main,
                  }
                }}
                role="button"
                aria-expanded={expandedExp === exp.id}
                aria-controls={`work-expand-${exp.id}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(exp.id);
                  }
                }}
              >
                {/* Timeline dot */}
                <Box
                  className="timeline-dot"
                  sx={{
                    position: 'absolute',
                    top: '2rem',
                    left: isMobile ? '0' : index % 2 === 0 ? 'calc(100% + 20px)' : '-16px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: exp.isCurrent ? theme.palette.primary.main : theme.palette.divider,
                    border: `3px solid ${theme.palette.background.default}`,
                    zIndex: 3,
                    transition: 'all 0.3s ease-in-out',
                    [theme.breakpoints.down('md')]: {
                      left: '0',
                    },
                  }}
                />

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    {exp.logo && (
                      <Box
                        component="img"
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        sx={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          backgroundColor: theme.palette.background.paper,
                          padding: '4px',
                          border: `1px solid ${theme.palette.divider}`,
                          opacity: exp.isCurrent ? 1 : 0.8,
                          transition: 'all 0.3s ease-in-out',
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                        <Box>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontSize: '1.5rem', 
                              fontWeight: 600, 
                              marginBottom: '0.25rem',
                              transition: 'color 0.3s ease-in-out',
                              color: expandedExp === exp.id 
                                ? theme.palette.primary.main 
                                : exp.isCurrent 
                                  ? theme.palette.text.primary 
                                  : theme.palette.text.secondary,
                            }}
                          >
                            {exp.role}
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            color={exp.isCurrent ? 'primary' : 'text.secondary'} 
                            sx={{ marginBottom: 0 }}
                          >
                            {exp.company} • {exp.duration}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(exp.id);
                          }}
                          aria-label={expandedExp === exp.id ? 'Collapse details' : 'Expand details'}
                          sx={{
                            color: 'text.secondary',
                            '&:hover, &:focus': {
                              color: 'primary.main',
                              backgroundColor: 'transparent',
                            },
                            transition: 'all 0.3s ease',
                            pointerEvents: 'auto', // Ensure the button is clickable
                          }}
                        >
                          {expandedExp === exp.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  <Collapse 
                    in={expandedExp === exp.id} 
                    timeout="auto" 
                    unmountOnExit
                    id={`work-expand-${exp.id}`}
                    onClick={(e) => e.stopPropagation()}
                    sx={{ pointerEvents: 'auto' }} // Allow interaction inside the expanded content
                  >
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <Paper 
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.03)' 
                            : 'rgba(0, 0, 0, 0.02)',
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                          Role Details
                        </Typography>
                        
                        <Box 
                          component="ul" 
                          className="work-description"
                          sx={{ 
                            paddingLeft: '1.5rem', 
                            marginBottom: '1.5rem',
                            '& li::marker': {
                              color: theme.palette.primary.main,
                              transition: 'color 0.3s ease-in-out',
                            }
                          }}
                        >
                          {exp.description.map((item, i) => (
                            <Typography 
                              key={i} 
                              component="li" 
                              variant="body1" 
                              sx={{ 
                                marginBottom: '0.75rem',
                                color: 'text.secondary',
                                lineHeight: 1.6,
                                '&::marker': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            >
                              {item}
                            </Typography>
                          ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                            Key Technologies & Skills:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {exp.skills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                variant="outlined"
                                sx={{
                                  backgroundColor: theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.08)'
                                    : 'rgba(0, 0, 0, 0.03)',
                                  borderColor: theme.palette.divider,
                                  color: 'text.secondary',
                                  '& .MuiChip-label': {
                                    px: 1.5,
                                    py: 0.5,
                                  },
                                  '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {exp.company === 'VitaData' && (
                          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              endIcon={<OpenInNewIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open('https://vitadata.com', '_blank');
                              }}
                              sx={{
                                textTransform: 'none',
                                borderRadius: '6px',
                                fontWeight: 500,
                              }}
                            >
                              Visit Company Website
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              endIcon={<OpenInNewIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add link to your resume or portfolio
                                window.open('#', '_blank');
                              }}
                              sx={{
                                textTransform: 'none',
                                borderRadius: '6px',
                                fontWeight: 500,
                              }}
                            >
                              View Project Details
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </Box>
                  </Collapse>

                  <Box 
                    className="work-skills"
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.75rem',
                      '& span': {
                        transition: 'all 0.3s ease-in-out',
                        opacity: exp.isCurrent ? 1 : 0.7,
                      }
                    }}
                  >
                    {exp.skills.map((skill) => (
                      <Typography
                        key={skill}
                        variant="caption"
                        sx={{
                          backgroundColor: exp.isCurrent 
                            ? `${theme.palette.background.paper}80` 
                            : `${theme.palette.background.paper}40`,
                          color: exp.isCurrent 
                            ? theme.palette.text.secondary 
                            : theme.palette.text.disabled,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          border: `1px solid ${theme.palette.divider}`,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Work;
