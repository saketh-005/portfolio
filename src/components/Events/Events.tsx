import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  Tabs,
  Tab,
  useMediaQuery,
  Paper,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

type EventType = 'hackathon' | 'workshop';

interface BaseEvent {
  id: number;
  title: string;
  type: EventType;
  organizer: string;
  date: string;
  description: string;
  image: string;
  projectUrl?: string;
  githubUrl?: string;
  role?: string;
}

interface HackathonEvent extends BaseEvent {
  type: 'hackathon';
  project: string;
  technologies: string[];
  awards?: string[];
}

interface WorkshopEvent extends BaseEvent {
  type: 'workshop';
  duration: string;
  topics: string[];
}

type EventItem = HackathonEvent | WorkshopEvent;

const events: EventItem[] = [
  {
    id: 1,
    title: 'Hack the North 2023',
    type: 'hackathon',
    organizer: 'University of Waterloo',
    date: 'September 2023',
    description: 'Developed an AI-powered tool that provides automated code reviews and suggestions for improvement. The tool analyzes code quality, performance, and security vulnerabilities using machine learning models.',
    project: 'AI-Powered Code Review Assistant',
    role: 'Full Stack Developer',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
    awards: ['Best Use of Google Cloud', 'Top 10 Finalist'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://example.com/ai-code-review',
    githubUrl: 'https://github.com/username/ai-code-review'
  } as HackathonEvent,
  {
    id: 2,
    title: 'MLH Local Hack Day: Build',
    type: 'workshop',
    organizer: 'Major League Hacking',
    date: 'June 2023',
    description: 'Conducted a workshop on building full-stack applications with React and Firebase. Covered topics including authentication, real-time database, and deployment.',
    duration: '4 hours',
    topics: ['React', 'Firebase', 'Authentication', 'Real-time Database', 'Deployment'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://example.com/react-firebase-workshop'
  } as WorkshopEvent,
  {
    id: 3,
    title: 'Hack the Valley 6',
    type: 'hackathon',
    organizer: 'University of Toronto Scarborough',
    date: 'January 2023',
    description: 'Created a mobile app that helps users track and reduce their carbon footprint by analyzing daily activities and providing personalized recommendations.',
    project: 'EcoTrack - Carbon Footprint Tracker',
    role: 'Frontend Developer',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    awards: ['Best Sustainability Hack'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    githubUrl: 'https://github.com/username/ecotrack'
  } as HackathonEvent,
  {
    id: 4,
    title: 'Intro to Web Development',
    type: 'workshop',
    organizer: 'Local Tech Community',
    date: 'March 2023',
    description: 'Led a beginner-friendly workshop introducing HTML, CSS, and JavaScript fundamentals. Participants built their first responsive website from scratch.',
    duration: '6 hours',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  } as WorkshopEvent
];

const Events: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState<'all' | EventType>('all');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: 'all' | EventType) => {
    setSelectedTab(newValue);
    setExpandedCard(null);
  };
  
  const toggleCardExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filter by selected tab
      if (selectedTab !== 'all' && event.type !== selectedTab) {
        return false;
      }
      return true;
    });
  }, [selectedTab]);

  // Type guard to check if event is a HackathonEvent
  const isHackathonEvent = (event: EventItem): event is HackathonEvent => {
    return event.type === 'hackathon';
  };

  // Type guard to check if event is a WorkshopEvent
  const isWorkshopEvent = (event: EventItem): event is WorkshopEvent => {
    return event.type === 'workshop';
  };

  // Render event card based on type
  const renderEventCard = (event: EventItem) => {
    const isExpanded = expandedCard === event.id;
    
    return (
      <motion.div
        key={event.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          sx={{ 
            mb: 3,
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[8],
            },
            transition: 'all 0.3s ease',
          }}
          onClick={() => toggleCardExpand(event.id)}
        >
          <CardMedia
            component="img"
            height="180"
            image={event.image}
            alt={event.title}
            sx={{
              objectFit: 'cover',
              filter: isExpanded ? 'brightness(0.7)' : 'brightness(0.9)',
              transition: 'filter 0.3s ease',
            }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Chip 
                label={event.type === 'hackathon' ? 'Hackathon' : 'Workshop'} 
                color={event.type === 'hackathon' ? 'primary' : 'secondary'} 
                size="small" 
                sx={{ mb: 1 }} 
              />
              <Typography variant="caption" color="text.secondary">
                {event.date}
              </Typography>
            </Box>
            
            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
              {event.title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {event.description.length > 150 
                ? `${event.description.substring(0, 150)}...` 
                : event.description}
            </Typography>
            
            {isHackathonEvent(event) && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Project: {event.project}
                </Typography>
                {event.role && (
                  <Typography variant="caption" color="text.secondary">
                    Role: {event.role}
                  </Typography>
                )}
              </Box>
            )}
            
            {isWorkshopEvent(event) && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Duration: {event.duration}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.topics.slice(0, 3).join(' • ')}
                  {event.topics.length > 3 && '...'}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip 
                label={event.organizer} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
              
              <Box>
                {isHackathonEvent(event) && event.awards && event.awards.length > 0 && (
                  <Chip
                    icon={<EmojiEventsIcon fontSize="small" />}
                    label={event.awards[0]}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 215, 0, 0.1)',
                      color: theme.palette.mode === 'dark' ? '#ffd700' : '#b8860b',
                      '& .MuiChip-icon': {
                        color: theme.palette.mode === 'dark' ? '#ffd700' : '#b8860b',
                      },
                    }}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {event.title} - Additional Details
                </Typography>
                
                {isHackathonEvent(event) ? (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Project Details:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Technologies Used:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {event.technologies.map((tech, idx) => (
                          <Chip 
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      
                      {event.awards && event.awards.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
                            <EmojiEventsIcon sx={{ mr: 1 }} /> Awards:
                          </Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {event.awards.map((award, idx) => (
                              <li key={idx}>
                                <Typography variant="body2" color="text.secondary">
                                  {award}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {event.githubUrl && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<GitHubIcon />}
                          href={event.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Code
                        </Button>
                      )}
                      
                      {event.projectUrl && (
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<OpenInNewIcon />}
                          href={event.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Project
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : isWorkshopEvent(event) && (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Workshop Details:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Duration: {event.duration}
                      </Typography>
                      
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Topics Covered:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {event.topics.map((topic, idx) => (
                          <Chip 
                            key={idx}
                            label={topic}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    {event.projectUrl && (
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                        href={event.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Workshop Materials
                      </Button>
                    )}
                  </Box>
                )}
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <Box id="events" sx={{ py: 8, px: { xs: 2, md: 4 }, bgcolor: 'background.paper' }}>
      <Box component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h2" sx={{ 
          fontWeight: 700, 
          mb: 2,
          textAlign: 'center',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          width: '100%'
        }}>
          Events & Workshops
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            maxWidth: '700px',
            mx: 'auto',
            px: 2
          }}
        >
          A collection of hackathons I've participated in and workshops I've conducted.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper 
            elevation={0}
            sx={{
              display: 'inline-flex',
              borderRadius: '50px',
              p: 0.5,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTabs-indicator': {
                  height: '100%',
                  borderRadius: '50px',
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.2)' 
                    : 'rgba(25, 118, 210, 0.1)',
                },
                '& .MuiTab-root': {
                  minWidth: '100px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <Tab 
                value="all" 
                label="All" 
                iconPosition="start"
                icon={<GroupsIcon fontSize="small" />}
              />
              <Tab 
                value="hackathon" 
                label="Hackathons"
                iconPosition="start"
                icon={<CodeIcon fontSize="small" />}
              />
              <Tab 
                value="workshop" 
                label="Workshops"
                iconPosition="start"
                icon={<SchoolIcon fontSize="small" />}
              />
            </Tabs>
          </Paper>
        </Box>
        
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 2
          }}
        >
          {filteredEvents.map((event) => renderEventCard(event))}
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
