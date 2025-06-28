import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Card, CardContent, CardMedia, Chip, Button, ButtonGroup } from '@mui/material';
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
  // Add your hackathon entries here
  // Example structure:
  // {
  //   id: 1,
  //   title: 'Hackathon Name',
  //   organizer: 'Company/Organization',
  //   date: 'Month Year',
  //   description: 'Brief description of the hackathon and your project',
  //   project: 'Project Name',
  //   role: 'Your Role (e.g., Full-stack Developer)',
  //   technologies: ['React', 'Node.js', 'MongoDB'],
  //   awards: ['1st Place', 'Best UI/UX'],
  //   image: '/hackathon1.jpg',
  //   projectUrl: 'https://project-demo.com',
  //   githubUrl: 'https://github.com/yourusername/project-repo'
  // }
];

const Hackathons: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filter, setFilter] = useState<string>('all');
  
  // Filter hackathons based on category if needed
  const filteredHackathons = filter === 'all' 
    ? hackathons 
    : hackathons.filter(h => h.technologies.some(tech => 
        filter === 'web' ? ['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(tech)
        : filter === 'ai' ? ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'AI'].includes(tech)
        : true
      ));

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
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup variant="outlined" size={isMobile ? 'small' : 'medium'}>
          <Button 
            onClick={() => setFilter('all')} 
            variant={filter === 'all' ? 'contained' : 'outlined'}
          >
            All
          </Button>
          <Button 
            onClick={() => setFilter('web')}
            variant={filter === 'web' ? 'contained' : 'outlined'}
          >
            Web
          </Button>
          <Button 
            onClick={() => setFilter('ai')}
            variant={filter === 'ai' ? 'contained' : 'outlined'}
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
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: '2rem',
          mt: 4
        }}
      >
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {hackathon.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={hackathon.image}
                    alt={hackathon.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mr: 1 }}>
                      {hackathon.title}
                    </Typography>
                    {hackathon.awards && hackathon.awards.length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <EmojiEventsIcon color="warning" sx={{ mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          {hackathon.awards.join(', ')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {hackathon.organizer} • {hackathon.date}
                  </Typography>
                  
                  <Typography variant="body1" paragraph sx={{ flexGrow: 1 }}>
                    {hackathon.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Project: {hackathon.project}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <GroupsIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {hackathon.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {hackathon.technologies.map((tech, i) => (
                      <Chip 
                        key={i} 
                        label={tech} 
                        size="small"
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: theme.palette.text.primary
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    {hackathon.githubUrl && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={hackathon.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </Button>
                    )}
                    {hackathon.projectUrl && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<OpenInNewIcon />}
                        href={hackathon.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ ml: 'auto' }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 4, gridColumn: '1 / -1' }}>
            <Typography variant="h6" color="text.secondary">
              No hackathons found matching the selected filter.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Hackathons;
