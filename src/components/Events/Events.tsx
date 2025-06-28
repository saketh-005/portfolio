import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  useTheme,
  Paper,
  CardMedia,
  CardActions,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SectionHeader from '../common/SectionHeader';
import TabSystem, { TabItem } from '../common/TabSystem';

type EventType = 'hackathon' | 'workshop';

interface BaseEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  type: EventType;
  description: string;
  image?: string;
  organizer: string;
  projectUrl?: string;
  githubUrl?: string;
}

interface HackathonEvent extends BaseEvent {
  type: 'hackathon';
  projectName: string;
  technologies: string[];
  teamSize: number;
  awards?: string[];
  role?: string;
}

interface WorkshopEvent extends BaseEvent {
  type: 'workshop';
  duration: string;
  topics: string[];
  learningOutcomes: string[];
  materialsUrl?: string;
}

type Event = HackathonEvent | WorkshopEvent;

// Type guards
const isHackathonEvent = (event: Event): event is HackathonEvent => {
  return event.type === 'hackathon';
};

const isWorkshopEvent = (event: Event): event is WorkshopEvent => {
  return event.type === 'workshop';
};

const events: Event[] = [
  {
    id: 1,
    title: 'Hack the North 2023',
    type: 'hackathon' as const,
    organizer: 'University of Waterloo',
    location: 'Waterloo, ON',
    date: 'September 2023',
    description: 'Developed an AI-powered tool that provides automated code reviews and suggestions for improvement.',
    projectName: 'AI-Powered Code Review Assistant',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
    teamSize: 4,
    awards: ['Best Use of Google Cloud', 'Top 10 Finalist'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    projectUrl: 'https://example.com/ai-code-review',
    githubUrl: 'https://github.com/username/ai-code-review',
    role: 'Full Stack Developer'
  },
  {
    id: 2,
    title: 'MLH Local Hack Day: Build',
    type: 'workshop' as const,
    organizer: 'Major League Hacking',
    location: 'Online',
    date: 'December 2022',
    description: 'Conducted a workshop on building full-stack applications with React and Firebase.',
    duration: '4 hours',
    topics: ['React', 'Firebase', 'Authentication', 'Real-time Database', 'Deployment'],
    learningOutcomes: [
      'Understand the basics of React and Firebase',
      'Learn how to build a full-stack application',
      'Implement user authentication',
      'Work with real-time databases'
    ],
    materialsUrl: 'https://example.com/workshop-materials'
  },
  {
    id: 3,
    title: 'Hack the Valley 6',
    type: 'hackathon' as const,
    organizer: 'University of Toronto Scarborough',
    location: 'Toronto, ON',
    date: 'January 2023',
    description: 'Created a mobile app that helps users track and reduce their carbon footprint.',
    projectName: 'EcoTrack - Carbon Footprint Tracker',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    teamSize: 3,
    awards: ['Best Sustainability Hack'],
    githubUrl: 'https://github.com/username/ecotrack',
    role: 'Frontend Developer'
  },
  {
    id: 4,
    title: 'Intro to Web Development',
    type: 'workshop' as const,
    organizer: 'Local Community College',
    location: 'San Francisco, CA',
    date: 'March 2023',
    description: 'Led a beginner-friendly workshop introducing HTML, CSS, and JavaScript fundamentals.',
    duration: '6 hours',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    learningOutcomes: [
      'Understand the basics of HTML, CSS, and JavaScript',
      'Learn how to build a responsive website',
      'Deploy a simple web application'
    ],
    materialsUrl: 'https://example.com/web-dev-workshop'
  }
];

const Events: React.FC = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<'all' | EventType>('all');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue as 'all' | EventType);
    setExpandedCard(null);
  };
  
  const eventTabs: TabItem[] = [
    { value: 'all', label: 'All Events', icon: <GroupsIcon /> },
    { value: 'hackathon', label: 'Hackathons', icon: <CodeIcon /> },
    { value: 'workshop', label: 'Workshops', icon: <SchoolIcon /> },
  ];
  
  const toggleCardExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const filteredEvents = useMemo(() => {
    if (selectedTab === 'all') return events;
    return events.filter((event): event is Event => {
      if (!event) return false;
      return event.type === selectedTab;
    });
  }, [selectedTab]);

  const renderEventCard = (event: Event) => {
    if (!event) return null;
    
    const isExpanded = expandedCard === event.id;
    const isHackathon = isHackathonEvent(event);
    const isWorkshop = isWorkshopEvent(event);

    const renderEventDetails = () => {
      if (isHackathon) {
        const hackathonEvent = event as HackathonEvent;
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Project:</strong> {hackathonEvent.projectName}
            </Typography>
            {hackathonEvent.role && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Role:</strong> {hackathonEvent.role}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Team Size:</strong> {hackathonEvent.teamSize}
            </Typography>
          </Box>
        );
      } else if (isWorkshop) {
        const workshopEvent = event as WorkshopEvent;
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Duration:</strong> {workshopEvent.duration}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {workshopEvent.topics.map((topic: string, idx: number) => (
                <Chip key={idx} label={topic} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        );
      }
      return null;
    };

    const renderExpandedContent = () => {
      if (!isExpanded) return null;

      if (isHackathon) {
        const hackathonEvent = event as HackathonEvent;
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Project Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {hackathonEvent.description}
              </Typography>
              
              {hackathonEvent.technologies && hackathonEvent.technologies.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Technologies Used:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {hackathonEvent.technologies.map((tech: string, idx: number) => (
                      <Chip key={idx} label={tech} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              )}
              
              {hackathonEvent.awards && hackathonEvent.awards.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Awards & Achievements:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {hackathonEvent.awards.map((award: string, idx: number) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEventsIcon color="primary" />
                        <Typography variant="body2">{award}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          </motion.div>
        );
      } else if (isWorkshop) {
        const workshopEvent = event as WorkshopEvent;
        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Workshop Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {workshopEvent.description}
              </Typography>
              
              {workshopEvent.learningOutcomes && workshopEvent.learningOutcomes.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Key Learnings:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {workshopEvent.learningOutcomes.map((outcome: string, idx: number) => (
                      <li key={idx}>
                        <Typography variant="body2">{outcome}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
              
              {workshopEvent.materialsUrl && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNewIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(workshopEvent.materialsUrl, '_blank');
                  }}
                  sx={{ mt: 2 }}
                >
                  View Workshop Materials
                </Button>
              )}
            </Paper>
          </motion.div>
        );
      }
      return null;
    };

    return (
      <motion.div
        key={event.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: 24 }}
      >
        <Card 
          elevation={isExpanded ? 4 : 2}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}
          onClick={() => toggleCardExpand(event.id)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {event.image && (
                <Box sx={{ width: { xs: '100%', md: 200 }, height: 150, flexShrink: 0 }}>
                  <CardMedia
                    component="img"
                    image={event.image}
                    alt={event.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Chip 
                    label={event.type === 'hackathon' ? 'Hackathon' : 'Workshop'} 
                    color={event.type === 'hackathon' ? 'primary' : 'secondary'} 
                    size="small" 
                    sx={{ alignSelf: 'flex-start' }}
                  />
                </Box>
                
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon fontSize="small" />
                  {event.organizer}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box component="span" sx={{ fontSize: '0.75rem' }}>📅</Box>
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box component="span" sx={{ fontSize: '0.75rem' }}>📍</Box>
                    {event.location}
                  </Typography>
                </Box>
                
                {renderEventDetails()}
                
                <CardActions sx={{ mt: 1, p: 0, justifyContent: 'flex-end' }}>
                  {event.githubUrl && (
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(event.githubUrl, '_blank');
                      }}
                      sx={{ color: 'text.secondary' }}
                    >
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  )}
                  {event.projectUrl && (
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(event.projectUrl, '_blank');
                      }}
                      sx={{ color: 'text.secondary' }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  )}
                </CardActions>
              </Box>
            </Box>
          </CardContent>
          
          <AnimatePresence>
            {renderExpandedContent()}
          </AnimatePresence>
        </Card>
      </motion.div>
    );
  };

  return (
    <Box 
      id="events"
      component="section"
      sx={{ 
        py: { xs: 6, md: 10 },
        position: 'relative',
        bgcolor: 'background.default',
        scrollMarginTop: '80px',
      }}
    >
      <Box sx={{ 
        maxWidth: '1400px', 
        mx: 'auto',
        px: { xs: 3, md: 4, lg: 6 },
        position: 'relative',
        zIndex: 1,
      }}>
        <SectionHeader 
          title="Events & Workshops"
          subtitle="A showcase of my participation in hackathons and workshops, highlighting collaborative projects and learning experiences."
          gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
        />

        <Box sx={{ mt: 6, mb: 8 }}>
          <TabSystem 
            tabs={eventTabs}
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          />
        </Box>
        
        <AnimatePresence>
          {filteredEvents.map((event: Event) => (
            <React.Fragment key={event.id}>
              {renderEventCard(event)}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Events;
