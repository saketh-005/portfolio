import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Button, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  Chip,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionHeader from '../common/SectionHeader';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    image: '/project1.jpg',
    github: 'https://github.com/saketh-005/ecommerce-platform',
    demo: 'https://ecommerce-demo.example.com',
    category: 'web',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    tags: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
    image: '/project2.jpg',
    github: 'https://github.com/saketh-005/task-management',
    demo: 'https://task-app-demo.example.com',
    category: 'web',
  },
  {
    id: 3,
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using DALL-E API to create unique images from text prompts.',
    tags: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
    image: '/project3.jpg',
    github: 'https://github.com/saketh-005/ai-image-generator',
    demo: 'https://ai-image-generator.example.com',
    category: 'ai',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Material-UI.',
    tags: ['React', 'TypeScript', 'Material-UI', 'Framer Motion'],
    image: '/project4.jpg',
    github: 'https://github.com/saketh-005/portfolio',
    demo: 'https://saketh-jangala.vercel.app',
    category: 'web',
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather and forecast using the OpenWeatherMap API.',
    tags: ['React', 'TypeScript', 'OpenWeatherMap API', 'Chart.js'],
    image: '/project5.jpg',
    github: 'https://github.com/saketh-005/weather-dashboard',
    demo: 'https://weather-dashboard-saketh.vercel.app',
    category: 'web',
  },
];

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const Projects: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [category, setCategory] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState<number>(isMobile ? 3 : 6);

  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);

  const showLoadMore = visibleProjects < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + (isMobile ? 3 : 6), filteredProjects.length));
  };

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <Box 
      id="projects" 
      sx={{ 
        py: 8,
        px: { xs: 3, sm: 4, md: 6 },
        maxWidth: '1400px',
        mx: 'auto',
        scrollMarginTop: '80px',
      }}
    >
      <SectionHeader 
        title="My Projects" 
        subtitle="A collection of my recent work and side projects" 
        gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]} 
      />
      
      <Tabs 
        value={category}
        onChange={(_, newValue: string) => setCategory(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
          },
          '& .MuiTab-root': {
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            textTransform: 'capitalize',
            minWidth: 'auto',
            px: 2,
            mx: 0.5,
          },
        }}
      >
        {categories.map((cat) => (
          <Tab 
            key={cat} 
            label={cat.replace(/-/g, ' ')} 
            value={cat}
            disableRipple
          />
        ))}
      </Tabs>

      <Grid container spacing={4}>
        {filteredProjects.slice(0, visibleProjects).map((project: Project, index: number) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.tags.map((tag: string) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small"
                          sx={{ 
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'rgba(0, 0, 0, 0.08)',
                            color: 'inherit',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon />}
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        Code
                      </Button>
                      {project.demo && (
                        <Button 
                          variant="contained" 
                          size="small" 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<OpenInNewIcon />}
                          sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                          Live Demo
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </ProjectCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {showLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button 
            variant="outlined"
            onClick={handleLoadMore}
            endIcon={<OpenInNewIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              transition: 'transform 0.2s',
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Projects;
