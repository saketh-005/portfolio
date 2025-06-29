import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  IconButton,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

interface EventImage {
  url: string;
  description: string;
}

interface HackathonEvent extends BaseEvent {
  type: 'hackathon';
  projectName: string;
  technologies: string[];
  teamSize: number;
  awards?: string[];
  role?: string;
  images?: EventImage[];
  projectUrls?: string[];
  credentialUrl?: string;
}

interface WorkshopEvent extends BaseEvent {
  type: 'workshop';
  duration: string;
  topics: string[];
  learningOutcomes: string[];
  materialsUrl?: string;
  credentialUrl?: string;
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
    title: 'Machine Learning Hackathon',
    type: 'hackathon' as const,
    organizer: 'Techgyan Technologies',
    location: 'Indian Institute of Technology, Hyderabad',
    date: 'June 21, 2025',
    description: '24-hour machine learning hackathon focused on developing practical AI solutions for healthcare and agriculture. Our team developed two innovative projects that leverage machine learning to solve real-world problems.',
    projectName: '1. DiabEase - Diabetes Prediction System | 2. AgriGuard - Plant Disease Detection',
    technologies: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenCV', 'Flask', 'React'],
    teamSize: 3,
    awards: ['1st Place Winner'],
    role: 'Machine Learning Engineer & Full Stack Developer',
    images: [
      { 
        url: 'https://drive.google.com/thumbnail?id=1tD5CNCc1q09HUQz9i9JlaBWmyfK_jks4&sz=w1000', 
        description: 'Appreciation Certificate' 
      },
      { 
        url: 'https://drive.google.com/thumbnail?id=1Ue9mBHhO_oiEUZFEh_D7TWmDVzQbmFUu&sz=w1000', 
        description: 'Team Photo with Organizers' 
      }
    ],
    projectUrls: [
      'https://github.com/username/diabetes-prediction',
      'https://github.com/username/plant-disease-detection'
    ],
    credentialUrl: 'https://drive.google.com/file/d/1yLWNh_p_lXdhDQW4MdZX0XJmlDRKC4qC/view?usp=sharing'
  },
  {
    id: 2,
    title: 'Artificial Intelligence Workshop',
    type: 'workshop' as const,
    organizer: 'Techgyan Technologies',
    location: 'Indian Institute of Technology, Hyderabad',
    date: 'June 2024',
    description: 'Comprehensive workshop covering AI, Machine Learning, Deep Learning, and hands-on activities with Google\'s Teachable Machine.',
    duration: '6 hours',
    topics: [
      'History of AI and key milestones',
      'AI, ML, Deep Learning, and Generative AI',
      'Machine Learning types: Supervised, Unsupervised, Reinforcement',
      'Google Teachable Machine',
      'AI Hackathon with real-world applications'
    ],
    learningOutcomes: [
      'Understand fundamental AI concepts and evolution',
      'Differentiate between AI, ML, DL, and Generative AI',
      'Create models for image, pose, and sound detection',
      'Develop AI solutions for real-world problems',
      'Participate in AI Hackathon'
    ],
    image: 'https://drive.google.com/thumbnail?id=1BKQhSDXTvxyN1dXwsPtODaJKIOf93f9s&sz=w1000',
    credentialUrl: 'https://drive.google.com/file/d/1nA3ZkpM3FoOz0JyjSOSEQ6QvnNGG6VW1/view?usp=sharing'
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
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  
                  {hackathonEvent.projectUrls && hackathonEvent.projectUrls.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Project Links:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {hackathonEvent.projectUrls.map((url: string, idx: number) => (
                          <Button
                            key={idx}
                            variant="outlined"
                            size="small"
                            startIcon={<GitHubIcon />}
                            endIcon={<OpenInNewIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(url, '_blank');
                            }}
                            fullWidth
                            sx={{
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              textAlign: 'left',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {url.split('/').pop() || `Project ${idx + 1}`}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {hackathonEvent.credentialUrl && (
                    <Box sx={{ mt: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EmojiEventsIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(hackathonEvent.credentialUrl, '_blank');
                        }}
                        fullWidth
                      >
                        View Winner Certificate
                      </Button>
                    </Box>
                  )}
                </Box>
                
                {hackathonEvent.images && hackathonEvent.images.length > 0 && (
                  <Box sx={{ 
                    flex: 1, 
                    minHeight: 300,
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                  }}>
                    <Carousel images={hackathonEvent.images} />
                  </Box>
                )}

              </Box>
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
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                {workshopEvent.materialsUrl && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<OpenInNewIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(workshopEvent.materialsUrl, '_blank');
                    }}
                  >
                    Workshop Materials
                  </Button>
                )}
                {workshopEvent.credentialUrl && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EmojiEventsIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(workshopEvent.credentialUrl, '_blank');
                    }}
                  >
                    View Credential
                  </Button>
                )}
              </Box>
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
        pt: 0,
        pb: 0,
        position: 'relative',
        bgcolor: 'background.default',
        scrollMarginTop: '30px',
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

// Carousel Component
const Carousel = ({ images }: { images: EventImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:900px)');
  const [startX, setStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setStartX(null);
    }
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <Box 
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            size="large"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            size="large"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </>
      )}

      {/* Slides */}
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          height: '100%',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              boxSizing: 'border-box',
            }}
          >
            <Box
              component="img"
              src={img.url}
              alt={img.description}
              sx={{
                maxWidth: '100%',
                maxHeight: '80%',
                objectFit: 'contain',
                borderRadius: 1,
                mb: 1,
                userSelect: 'none',
              }}
              draggable="false"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                fontSize: '0.75rem',
                mt: 1,
              }}
            >
              {img.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: 0.7,
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Events;
