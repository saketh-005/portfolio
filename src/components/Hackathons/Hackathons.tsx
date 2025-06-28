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
        padding: isMobile ? '5rem 1rem' : '6rem 10%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4rem' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 600,
              color: theme.palette.text.primary,
              whiteSpace: 'nowrap',
              mr: 2,
              '& span': {
                color: theme.palette.primary.main,
                marginRight: '0.5rem'
              }
            }}
          >
            <span>05.</span> Hackathons
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
            md: 'repeat(3, 1fr)' 
          },
          gap: { xs: '2rem', md: '1.5rem' },
          marginTop: '2rem',
          '& > *': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        {filteredHackathons.map((hackathon) => (
          <motion.div
            key={hackathon.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(30, 30, 30, 0.5)' 
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 20px ${theme.palette.primary.main}20`,
                  borderColor: theme.palette.primary.main,
                },
                overflow: 'hidden',
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
              <CardContent sx={{ 
                flexGrow: 1, 
                p: { xs: '1.25rem', sm: '1.5rem' },
                '&:last-child': { pb: { xs: '1.25rem', sm: '1.5rem' } }
              }}>
                <Box sx={{ mb: '1.5rem' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    mb: '0.75rem'
                  }}>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        lineHeight: 1.4,
                        m: 0
                      }}
                    >
                      {hackathon.title}
                    </Typography>
                    <Chip 
                      label={hackathon.date} 
                      size="small" 
                      sx={{ 
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)' 
                          : 'rgba(0, 0, 0, 0.05)',
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        fontSize: '0.7rem',
                        height: '22px',
                        minWidth: 'fit-content',
                        flexShrink: 0
                      }} 
                    />
                  </Box>

                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      mb: '1rem'
                    }}
                  >
                    {hackathon.organizer}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      mb: '1.5rem',
                      WebkitLineClamp: 3,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {hackathon.description}
                  </Typography>

                  <Box sx={{ 
                    p: '1rem', 
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.03)' 
                      : 'rgba(0, 0, 0, 0.02)', 
                    borderRadius: '6px',
                    border: `1px solid ${theme.palette.divider}`,
                    mb: '1.5rem'
                  }}>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.7rem',
                        mb: '0.5rem'
                      }}
                    >
                      Project
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: '0.75rem',
                        fontSize: '1rem'
                      }}
                    >
                      {hackathon.project}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: theme.palette.text.secondary
                    }}>
                      <GroupsIcon fontSize="small" />
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {hackathon.role}
                      </Typography>
                    </Box>
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
                        sx={{
                          fontSize: '0.7rem',
                          height: '24px',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                          color: theme.palette.text.primary,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 'auto', pt: 2 }}>
                  {hackathon.githubUrl && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={hackathon.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<GitHubIcon fontSize="small" />}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.5,
                        minWidth: 'fit-content',
                        flex: 1,
                      }}
                    >
                      Code
                    </Button>
                  )}
                  {hackathon.projectUrl && (
                    <Button
                      variant="contained"
                      size="small"
                      href={hackathon.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<OpenInNewIcon fontSize="small" />}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.5,
                        minWidth: 'fit-content',
                        flex: 1,
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
