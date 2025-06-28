import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Button, Tabs, Tab, Card, CardContent, CardMedia, Container } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
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
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Material-UI. Features smooth animations, dark/light mode, and a clean, professional design.',
    tags: ['React', 'TypeScript', 'Material-UI', 'Framer Motion', 'Responsive Design'],
    image: '/project-portfolio.jpg',
    github: 'https://github.com/saketh-005/portfolio',
    demo: 'https://your-portfolio-demo.com',
    category: 'web',
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'A mobile-first fitness tracking application with workout logging, progress tracking, and exercise library.',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    image: '/project4.jpg',
    github: 'https://github.com/saketh-005/fitness-tracker',
    demo: 'https://fitness-tracker-demo.example.com',
    category: 'mobile',
  },
  {
    id: 5,
    title: 'Recipe Finder',
    description: 'A web application to discover and save recipes based on available ingredients and dietary preferences.',
    tags: ['Vue.js', 'Spoonacular API', 'Vuex', 'Vuetify'],
    image: '/project5.jpg',
    github: 'https://github.com/saketh-005/recipe-finder',
    demo: 'https://recipe-finder-demo.example.com',
    category: 'web',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with modern web technologies to showcase projects and skills.',
    tags: ['React', 'TypeScript', 'Material-UI', 'Framer Motion'],
    image: '/project6.jpg',
    github: 'https://github.com/saketh-005/portfolio',
    demo: 'https://my-portfolio.example.com',
    category: 'web',
  },
];

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [category, setCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(0);

  // Reset visible projects when category changes
  useEffect(() => {
    setVisibleProjects(isMobile ? 3 : 6);
  }, [category, isMobile]);

  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);

  const showLoadMore = visibleProjects < filteredProjects.length;

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + (isMobile ? 3 : 6), filteredProjects.length));
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
  ];

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '5rem 1rem' : '5rem 10%',
        scrollMarginTop: '80px',
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
              fontWeight: 600,
              whiteSpace: 'nowrap',
              marginRight: '1.5rem',
              color: theme.palette.text.primary,
              '&:after': {
                content: '""',
                display: 'block',
                width: '300px',
                height: '1px',
                marginLeft: '20px',
                backgroundColor: theme.palette.primary.main,
                [theme.breakpoints.down('sm')]: {
                  width: '100px',
                },
              },
            }}
          >
            <span style={{ color: theme.palette.primary.main }}>05.</span> Projects
          </Typography>
        </Box>
      </motion.div>

      <Box sx={{ marginBottom: '3rem' }}>
        <Tabs
          value={category}
          onChange={(_, newValue) => setCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiTab-root': {
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
              '&:hover': {
                color: theme.palette.primary.main,
                opacity: 1,
              },
            },
          }}
        >
          {categories.map((cat) => (
            <Tab 
              key={cat.id} 
              value={cat.id} 
              label={cat.label} 
              sx={{ 
                textTransform: 'none',
                fontSize: '1rem',
                minWidth: 'auto',
                padding: '0 1rem',
                '&:first-of-type': {
                  paddingLeft: 0,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Container maxWidth="lg" sx={{ width: '100%', px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 2,
            width: '100%',
            '& > *': {
              minWidth: 0, // Prevents flex items from overflowing
            },
            // Ensure all cards in a row have the same height
            '& .MuiCard-root': {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
            '& .MuiCardContent-root': {
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            },
            '& .project-actions': {
              mt: 'auto',
              pt: 2,
            }
          }}
        >
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <Box key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="project-card"
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                  width: '100%',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
                    borderColor: theme.palette.primary.main,
                    '& .project-title': {
                      color: theme.palette.primary.main,
                    },
                    '& .project-image': {
                      filter: 'grayscale(0%) contrast(1) brightness(0.9)',
                      transform: 'scale(1.05)',
                    },
                    '& .project-tag': {
                      backgroundColor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                    },
                    '& .project-link': {
                      color: theme.palette.primary.main,
                      '& svg': {
                        transform: 'translateX(4px)',
                      }
                    }
                  },
                }}
              >
                {/* Temporarily hidden - Project Image */}
                <Box sx={{ 
                  display: 'none', // Hide the image container
                  position: 'relative', 
                  paddingTop: '56.25%',
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    className="project-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0, // Make image transparent
                      transition: 'all 0.3s ease-in-out',
                    }}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 3
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Typography 
                      variant="h3" 
                      className="project-title"
                      sx={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        transition: 'color 0.3s ease-in-out',
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
                      >
                        <GitHubIcon sx={{ transition: 'color 0.3s ease-in-out' }} />
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
                      >
                        <OpenInNewIcon sx={{ transition: 'transform 0.3s ease-in-out' }} />
                      </a>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, flexGrow: 1, minHeight: '6em' }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        minHeight: '6em',
                        maxHeight: '8em',
                      }}
                    >
                      {project.description}
                    </Typography>
                  </Box>
                  <Box className="project-tags" sx={{ mt: 'auto', pt: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {project.tags.map((tag) => (
                      <Typography 
                        key={tag} 
                        variant="caption" 
                        className="project-tag"
                        sx={{ 
                          padding: '0.25rem 0.75rem',
                          backgroundColor: `${theme.palette.primary.main}08`,
                          color: theme.palette.text.secondary,
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '0.7rem',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
          </Box>
        ))}
      </Box>
      
      {showLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={loadMore}
            endIcon={<ExpandMoreIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}15`,
              },
            }}
          >
            Show More Projects
          </Button>
        </Box>
      )}
      </Container>
    </Box>
  );
};

export default Projects;
