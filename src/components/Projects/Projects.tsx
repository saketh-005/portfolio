import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  Chip,
  styled,
  Paper
} from '@mui/material';
import TabSystem, { TabItem } from '../common/TabSystem';
import CodeIcon from '@mui/icons-material/Code';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

type ProjectCategory = 'all' | 'web' | 'ai' | 'mobile';

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
    id: 6,
    title: 'Mobile Fitness App',
    description: 'A cross-platform mobile application for tracking workouts and nutrition with personalized plans.',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    image: '/project6.jpg',
    github: 'https://github.com/saketh-005/fitness-app',
    demo: 'https://expo.dev/@saketh/fitness-app',
    category: 'mobile',
  },
  {
    id: 7,
    title: 'E-commerce Mobile App',
    description: 'A mobile shopping application with product catalog, cart, and secure checkout.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/project7.jpg',
    github: 'https://github.com/saketh-005/ecommerce-mobile',
    demo: 'https://expo.dev/@saketh/ecommerce-app',
    category: 'mobile',
  },
  {
    id: 8,
    title: 'Sentiment Analysis Tool',
    description: 'An AI tool that analyzes text sentiment using natural language processing.',
    tags: ['Python', 'NLTK', 'Flask', 'React'],
    image: '/project8.jpg',
    github: 'https://github.com/saketh-005/sentiment-analysis',
    demo: 'https://sentiment-analyzer-demo.vercel.app',
    category: 'ai',
  },
  {
    id: 11,
    title: 'Diabetes Prediction',
    description: 'A machine learning web application that predicts diabetes risk using patient health metrics with 86.6% accuracy. Features include real-time predictions, feature importance visualization, and performance metrics.',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Machine Learning', 'XGBoost', 'Pandas'],
    image: '/project-diabetes.jpg',
    github: 'https://github.com/saketh-005/diabetes-prediction',
    demo: 'https://huggingface.co/spaces/saketh-005/diabetes-prediction',
    category: 'ai',
  },
  {
    id: 10,
    title: 'Plant Disease Detection',
    description: 'A deep learning web application that identifies 38 different plant diseases from leaf images using a custom CNN model, providing fast and accurate predictions with confidence scores.',
    tags: ['Python', 'TensorFlow', 'Streamlit', 'CNN', 'Computer Vision', 'Docker'],
    image: '/project-plant-disease.jpg',
    github: 'https://github.com/saketh-005/plant_disease_detection',
    demo: 'https://huggingface.co/spaces/saketh-005/plant-disease-detection',
    category: 'ai',
  },
  {
    id: 9,
    title: 'PDF Chat App',
    description: 'A privacy-focused web app to chat with PDF documents using AI. Upload any PDF, ask questions, and get instant answers powered by state-of-the-art language models.',
    tags: ['Python', 'Streamlit', 'LangChain', 'Hugging Face', 'Chroma DB', 'Docker'],
    image: '/project-pdf-chat.jpg',
    github: 'https://github.com/saketh-005/pdf-chat-app',
    demo: 'https://huggingface.co/spaces/saketh-005/pdf-chat-app',
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
  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');
  const [visibleProjects, setVisibleProjects] = useState<number>(6);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const tabs: TabItem[] = [
    { value: 'all', label: 'All Projects', icon: <AllInclusiveIcon /> },
    { value: 'web', label: 'Web Apps', icon: <CodeIcon /> },
    { value: 'ai', label: 'AI/ML', icon: <CodeIcon /> },
    { value: 'mobile', label: 'Mobile Apps', icon: <CodeIcon /> },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const showLoadMore = filteredProjects.length > visibleProjects;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue as ProjectCategory);
  };

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + (isMobile ? 3 : 6), filteredProjects.length));
  };

  return (
    <Box 
      id="projects" 
      sx={{ 
        width: '100%',
        maxWidth: '1400px',
        mx: 'auto',
        px: { xs: 3, sm: 4, md: 6 },
        py: 8,
        scrollMarginTop: '30px',
      }}
    >
      <SectionHeader 
        title="My Projects" 
        subtitle="Some of my recent work" 
        gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]} 
      />
      
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        mb: 6,
      }}>
        <TabSystem 
          value={activeTab}
          onChange={handleTabChange}
          tabs={tabs}
          centered={true}
          fullWidth={isMobile}
        />
      </Box>
      
      <Grid container spacing={4}>
        {filteredProjects.length > 0 ? (
          filteredProjects.slice(0, visibleProjects).map((project: Project, index: number) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard>
                  {/* Image hidden but data preserved */}
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
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found in this category
            </Typography>
          </Box>
        )}
      </Grid>

      {showLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            endIcon={<ExpandMoreIcon />}
            sx={{
              px: 4,
              py: 1.25,
              borderRadius: '50px',
              textTransform: 'none',
              borderColor: theme.palette.divider,
              color: theme.palette.text.secondary,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}08`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
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
