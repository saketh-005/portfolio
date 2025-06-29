import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  Paper, 
  useMediaQuery,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SectionHeader from '../common/SectionHeader';
import TabSystem, { TabItem } from '../common/TabSystem';

interface SkillItemType {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  icon: string;
  items: SkillItemType[];
}

const skills: SkillGroup[] = [
  {
    category: 'Languages',
    icon: '💬',
    items: [
      { name: 'English', level: 100 },
      { name: 'Telugu', level: 100 },
      { name: 'Hindi', level: 80 },
    ],
  },
  {
    category: 'Programming',
    icon: '💻',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    category: 'Web',
    icon: '🌐',
    items: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 80 },
    ],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    items: [
      { name: 'MySQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    category: 'DevOps',
    icon: '🛠️',
    items: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 80 },
    ],
  },
];

const SkillBar = styled('div')(({ theme }) => ({
  width: '100%',
  height: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '0%',
    borderRadius: '4px',
    transition: 'width 1s ease',
  },
  '&:hover:before': {
    transform: 'scaleY(1.2)',
    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
  }
}));

const StyledSkillItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  height: '100%',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    '& .skill-icon-container': {
      transform: 'scale(1.1)',
      background: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.05)',
    },
  },
}));

const Skills: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  
  // Animation delay for staggered animations
  const getDelay = (index: number) => index * 100; // ms
  
  const skillTabs: TabItem[] = [
    { value: 'all', label: 'All Skills' },
    ...skills.map(skill => ({
      value: skill.category.toLowerCase(),
      label: skill.category,
      icon: <span>{skill.icon}</span>
    }))
  ];
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  
  const filteredSkills = selectedTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === selectedTab);
  
  const getGradient = (level: number) => {
    if (level >= 90) return `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`;
    if (level >= 70) return `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}90)`;
    return `linear-gradient(90deg, ${theme.palette.primary.main}90, ${theme.palette.primary.light}70)`;
  };
  
  // Apply animation after component mounts
  React.useEffect(() => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-level');
        if (width) {
          (bar as HTMLElement).style.width = `${width}%`;
        }
      }, index * 100);
    });
  }, [selectedTab]);

  return (
    <Box 
      id="skills" 
      ref={ref} 
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
          title="Skills & Expertise"
          subtitle="Technologies and tools I'm proficient in and use regularly to build amazing applications."
          gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
        />
        
        <Box sx={{ mt: 6, mb: 8 }}>
          <TabSystem
            value={selectedTab}
            onChange={handleTabChange}
            tabs={skillTabs}
            variant="scrollable"
            scrollButtons="auto"
            fullWidth={isMobile}
          />
        </Box>

        {/* Skills Grid */}
        <Box
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)' 
            }, 
            gap: 4,
            '& > *': {
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[8],
              }
            }
          }}
        >
          {filteredSkills.map((group, groupIndex) => (
            <Fade 
              key={group.category}
              in={true}
              timeout={500}
              style={{ transitionDelay: `${getDelay(groupIndex)}ms` }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%',
                }}
              >
                <StyledSkillItem>
                  <Box
                    className="skill-icon-container"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      transition: 'all 0.3s ease',
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      '& svg': {
                        fontSize: 30,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {group.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    {group.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {group.items.map((skill, skillIndex) => (
                      <Box key={skill.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {skill.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {skill.level}%
                          </Typography>
                        </Box>
                        <SkillBar>
                          <Box
                            className="skill-bar-fill"
                            data-level={skill.level}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: 0, // Will be set by the useEffect
                              borderRadius: 4,
                              background: getGradient(skill.level),
                              boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
                              transition: `width 1s ease ${getDelay(skillIndex)}ms`,
                            }}
                          />
                        </SkillBar>
                      </Box>
                    ))}
                  </Box>
                </StyledSkillItem>
              </Box>
            </Fade>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
