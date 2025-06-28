import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Paper, 
  Tooltip, 
  PaperProps, 
  SxProps, 
  Theme 
} from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { styled } from '@mui/material/styles';

interface SkillItemType {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  icon?: string;
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

interface CustomCSSProperties extends React.CSSProperties {
  '--progress'?: string;
  '--gradient'?: string;
}

const StyledSkillItem = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    '& .skill-icon-container': {
      transform: 'scale(1.1)',
      background: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.05)',
    },
  },
}));

const SkillBar = styled(motion.div)(({ theme }: { theme: Theme }) => ({
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
    width: 'var(--progress, 0%)',
    background: 'var(--gradient)',
    transformOrigin: 'left',
    transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease',
    borderRadius: '4px',
    boxShadow: `0 0 10px ${theme.palette.primary.main}80`,
  },
  '&:hover:before': {
    transform: 'scaleY(1.2)',
    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
  }
}));

const SkillItem = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: '1.8rem',
  borderRadius: '12px',
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 40, 0.7)' 
    : 'rgba(255, 255, 255, 0.8)',
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: 'blur(10px)',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 20px 40px -15px ${theme.palette.primary.main}30`,
    borderColor: theme.palette.primary.main,
    '&:before': {
      transform: 'scaleX(1)',
    },
    '& .skill-icon-container': {
      transform: 'scale(1.1) rotate(5deg)',
      backgroundColor: `${theme.palette.primary.main}25`,
    }
  },
  '&:active': {
    transform: 'translateY(-4px) scale(1.01)',
  }
}));

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as unknown as React.RefObject<Element>, { once: true, amount: 0.2 });
  
  // Gradient colors for the skill bars
  const getGradient = (level: number) => {
    if (level >= 90) return `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`;
    if (level >= 70) return `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}90)`;
    return `linear-gradient(90deg, ${theme.palette.primary.main}90, ${theme.palette.primary.light}70)`;
  };

  // Animation variants for the skill bars
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  // Grid layout based on screen size
  const getGridTemplateColumns = () => {
    if (isMobile) return '1fr';
    return 'repeat(auto-fit, minmax(300px, 1fr))';
  };

  return (
    <Box
      ref={ref}
      id="skills"
      sx={{
        minHeight: '100vh',
        py: 8,
        px: { xs: 2, sm: 4, md: 6 },
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.light}10 0%, transparent 25%),
                      radial-gradient(circle at 80% 70%, ${theme.palette.secondary?.light || theme.palette.primary.light}10 0%, transparent 25%)`,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1400,
          mx: 'auto',
        }}
      >
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Skills & Expertise
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Here are the technologies and tools I work with on a daily basis.
          </Typography>
        </Box>

        {/* Skills Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumns(),
            gap: 3,
            mt: 6,
          }}
        >
          {skills.map((group, groupIndex) => (
            <Box
              key={group.category}
              component={motion.div}
              custom={groupIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              onHoverStart={() => setHoveredSkill(groupIndex)}
              onHoverEnd={() => setHoveredSkill(null)}
              sx={{ height: '100%' }}
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
                  fontSize: '1.8rem',
                }}
              >
                {group.icon}
              </Box>
              
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                    borderRadius: '3px',
                  },
                }}
              >
                {group.category}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {group.items.map((skill, skillIndex) => (
                  <Box key={skill.name} sx={{ mb: 2.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <Tooltip title={`${skill.level}%`} placement="top" arrow>
                      <Box
                        className="skill-bar-container"
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.05)',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            pointerEvents: 'none',
                          },
                        }}
                      >
                        <SkillBar 
                          style={{
                            '--progress': isInView ? `${skill.level}%` : '0%',
                            '--gradient': getGradient(skill.level),
                          } as CustomCSSProperties}
                          initial={false}
                          animate={{
                            opacity: isInView ? 1 : 0.5,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.1 * skillIndex,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        />
                      </Box>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
              </StyledSkillItem>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
