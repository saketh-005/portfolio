import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  ButtonGroup, 
  Chip, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';

interface Hackathon {
  id: number;
  title: string;
  organizer: string;
  date: string;
  description: string;
  project: string;
  role: string;
  technologies: string[];
  awards?: string[];
  image: string;
  projectUrl?: string;
  githubUrl?: string;
}

const hackathons: Hackathon[] = [
  {
    id: 1,
    title: 'Hack the Future',
    organizer: 'Tech Innovators Inc.',
    date: 'May 2024',
    description: 'A 48-hour hackathon focused on building solutions for sustainable development goals using cutting-edge technology.',
    project: 'EcoTrack',
    role: 'Full-stack Developer & Team Lead',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
    awards: ['1st Place Overall', 'Best Use of AI/ML'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://ecotrack-demo.com',
    githubUrl: 'https://github.com/yourusername/ecotrack'
  },
  {
    id: 2,
    title: 'Code for Good',
    organizer: 'Global Hackers Foundation',
    date: 'March 2024',
    description: 'A social impact hackathon where developers build solutions for non-profit organizations to address global challenges.',
    project: 'HealthBridge',
    role: 'Frontend Developer',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    awards: ['Best UI/UX', 'Community Choice Award'],
    image: 'https://images.unsplash.com/photo-1522071820081-009c01201c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://healthbridge-demo.com',
    githubUrl: 'https://github.com/yourusername/healthbridge'
  },
  {
    id: 3,
    title: 'AI Innovation Challenge',
    organizer: 'TechGiant AI Labs',
    date: 'January 2024',
    description: 'A competition focused on developing innovative AI solutions for real-world problems in healthcare and education.',
    project: 'EduAI Tutor',
    role: 'AI/ML Engineer',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'React'],
    awards: ['2nd Place', 'Most Innovative Solution'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://eduaidemo.com',
    githubUrl: 'https://github.com/yourusername/eduaidemo'
  },
  {
    id: 4,
    title: 'Blockchain for Social Impact',
    organizer: 'Crypto Foundation',
    date: 'November 2023',
    description: 'Exploring blockchain technology to create transparent and decentralized solutions for social impact initiatives.',
    project: 'BlockAid',
    role: 'Blockchain Developer',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    awards: ['Best Use of Blockchain', 'Social Impact Award'],
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    projectUrl: 'https://blockaid-demo.com',
    githubUrl: 'https://github.com/yourusername/blockaid'
  },
  {
    id: 5,
    title: 'Hack the Climate',
    organizer: 'GreenTech Alliance',
    date: 'September 2023',
    description: 'Developing innovative solutions to combat climate change and promote environmental sustainability through technology.',
    project: 'CarbonPrint',
    role: 'Full-stack Developer',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    awards: ['Best Sustainability Solution', 'Audience Choice'],
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://carbonprint-demo.com',
    githubUrl: 'https://github.com/yourusername/carbonprint'
  },
  {
    id: 6,
    title: 'FinTech Innovation Hackathon',
    organizer: 'Global Finance Group',
    date: 'July 2023',
    description: 'Creating the next generation of financial technology solutions to revolutionize banking and personal finance.',
    project: 'PayTrack',
    role: 'Mobile Developer',
    technologies: ['Flutter', 'Firebase', 'Node.js', 'Stripe API'],
    awards: ['Best FinTech Solution', 'Most Innovative Payment Solution'],
    image: 'https://images.unsplash.com/photo-1554224155-3a58922a22c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80',
    projectUrl: 'https://paytrack-demo.com',
    githubUrl: 'https://github.com/yourusername/paytrack'
  }
];

const Hackathons: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filter, setFilter] = useState<string>('all');
  
  // Filter hackathons based on category if needed
  const filteredHackathons = useMemo(() => {
    if (filter === 'all') return hackathons;
    
    const techMap: Record<string, string[]> = {
      'web': ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
      'ai': ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'AI'],
      'blockchain': ['Solidity', 'Ethereum', 'Web3.js', 'Blockchain']
    };
    
    return hackathons.filter((hackathon: Hackathon) => 
      techMap[filter]?.some((tech: string) => 
        hackathon.technologies.some((t: string) => 
          t.toLowerCase().includes(tech.toLowerCase())
        )
      )
    );
  }, [filter, hackathons]);

  return (
    <Box 
      id="hackathons" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
        maxWidth: '1400px',
        mx: 'auto'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 6,
            width: '100%'
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: theme.palette.text.primary,
              whiteSpace: 'nowrap',
              mr: 2
            }}
          >
            <span style={{ color: theme.palette.primary.main }}>05.</span> Hackathons
          </Typography>
          <Box 
            sx={{ 
              flexGrow: 1, 
              height: '1px', 
              backgroundColor: theme.palette.divider,
              ml: 2,
              '&:after': {
                content: '""',
                display: 'block',
                width: '300px',
                height: '1px',
                backgroundColor: theme.palette.primary.main,
                [theme.breakpoints.down('sm')]: {
                  width: '100px',
                },
              },
            }} 
          />
        </Box>
      </motion.div>

      {/* Filter Buttons */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup variant="outlined" size={isMobile ? 'small' : 'medium'}>
          <Button 
            onClick={() => setFilter('all')} 
            variant={filter === 'all' ? 'contained' : 'outlined'}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter('web')}
            variant={filter === 'web' ? 'contained' : 'outlined'}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            Web
          </Button>
          <Button 
            onClick={() => setFilter('ai')}
            variant={filter === 'ai' ? 'contained' : 'outlined'}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
            }}
          >
            AI/ML
          </Button>
        </ButtonGroup>
      </Box>

      {/* Hackathons Grid */}
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: '2rem',
        }}
      >
        {filteredHackathons.map((hackathon) => (
          <motion.div
            key={hackathon.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                  borderColor: theme.palette.primary.light,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={hackathon.image}
                alt={hackathon.title}
                sx={{
                  objectFit: 'cover',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Typography variant="h6" component="h3" sx={{ 
                    fontWeight: 700, 
                    lineHeight: 1.3,
                    fontSize: '1.1rem',
                    color: theme.palette.text.primary,
                    mb: 0.5
                  }}>
                    {hackathon.project}
                  </Typography>
                  {hackathon.awards && hackathon.awards.length > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                      <EmojiEventsIcon fontSize="small" color="warning" />
                    </Box>
                  )}
                </Box>
                
                <Typography variant="subtitle2" color="primary" sx={{ 
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <GroupsIcon fontSize="inherit" />
                  {hackathon.organizer}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ 
                  mb: 2, 
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  flexGrow: 1
                }}>
                  {hackathon.description}
                </Typography>
                
                <Box sx={{ 
                  backgroundColor: theme.palette.action.hover,
                  p: 1.5,
                  borderRadius: 1,
                  mb: 2,
                  borderLeft: `3px solid ${theme.palette.primary.main}`
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      Role
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {hackathon.role}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      Date
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {hackathon.date}
                    </Typography>
                  </Box>
                </Box>
                
                {hackathon.awards && hackathon.awards.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      mb: 1, 
                      fontWeight: 700, 
                      color: theme.palette.text.primary,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Awards & Achievements
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {hackathon.awards.map((award, index) => (
                        <Chip
                          key={index}
                          label={award}
                          size="small"
                          color="primary"
                          variant="outlined"
                          icon={<EmojiEventsIcon fontSize="small" color="warning" />}
                          sx={{
                            fontSize: '0.7rem',
                            height: '24px',
                            '& .MuiChip-label': {
                              px: 1,
                              pl: 0.5,
                            },
                            backgroundColor: theme.palette.primary.contrastText,
                            borderColor: theme.palette.primary.light,
                            '& .MuiChip-icon': {
                              color: theme.palette.warning.main,
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontWeight: 700, 
                    color: theme.palette.text.primary,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {hackathon.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          height: '24px',
                          '& .MuiChip-label': {
                            px: 1,
                          },
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          color: theme.palette.text.secondary,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  mt: 'auto', 
                  pt: 1,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  '& .MuiButton-root': {
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    px: 1.5,
                    py: 0.75,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                    },
                  }
                }}>
                  {hackathon.githubUrl && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<GitHubIcon fontSize="small" />}
                      href={hackathon.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.primary,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          backgroundColor: `${theme.palette.primary.main}08`,
                        },
                      }}
                    >
                      View Code
                    </Button>
                  )}
                  {hackathon.projectUrl && (
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      endIcon={<OpenInNewIcon fontSize="small" />}
                      href={hackathon.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        ml: 'auto',
                        backgroundColor: theme.palette.primary.main,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                        },
                      }}
                    >
                      Live Demo
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
      
      {filteredHackathons.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, gridColumn: '1 / -1' }}>
          <Typography variant="h6" color="text.secondary">
            No hackathons found matching the selected filter.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Hackathons;
