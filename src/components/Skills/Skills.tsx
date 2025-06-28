import React, { useState, useRef } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper, Tooltip } from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { styled } from '@mui/material/styles';

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
    category: 'Programming Languages',
    icon: '💻',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    category: 'Web Technologies',
    icon: '🌐',
    items: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Node.js', level: 75 },
    ],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    items: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'SQL', level: 90 },
    ],
  },
  {
    category: 'Tools & Technologies',
    icon: '🛠️',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'Kubernetes', level: 70 },
      { name: 'AWS', level: 65 },
      { name: 'REST APIs', level: 80 },
      { name: 'Microservices', level: 75 },
    ],
  },
];

// Extend the CSSProperties interface to include CSS custom properties
interface CustomCSSProperties extends React.CSSProperties {
  '--progress'?: string;
}

const SkillBar = styled(motion.div)<{ level: number }>(({ theme, level }) => {
  const progressStyle: CustomCSSProperties = {
    '--progress': '0%',
  };
  
  return {
    width: '100%',
    height: '6px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative',
    ...progressStyle,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 'var(--progress, 0%)',
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      transformOrigin: 'left',
      transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
    }
  };
});

const SkillItem = styled(Paper)(({ theme }) => ({
  padding: '1.5rem',
  borderRadius: '8px',
  height: '100%',
  transition: 'all 0.3s ease',
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 30px -15px ${theme.palette.primary.main}40`,
    borderColor: theme.palette.primary.main,
  },
}));

interface SkillItemType {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  icon?: string;
  items: SkillItemType[];
}

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as unknown as React.RefObject<Element>, { once: true, amount: 0.2 });

  return (
    <Box
      ref={ref}
      id="skills"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '5rem 2rem' : '5rem 10%',
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
              display: 'flex',
              alignItems: 'center',
              fontSize: '2.5rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.5rem',
                marginRight: '1rem',
                flexWrap: 'wrap',
                '&:after': {
                  content: 'none',
                },
              },
              '&:after': {
                content: '""',
                display: 'block',
                width: '200px',
                height: '1px',
                backgroundColor: theme.palette.divider,
                marginLeft: '20px',
                [theme.breakpoints.down('md')]: {
                  width: '100px',
                  marginLeft: '15px',
                },
              },
            }}
          >
            <span style={{ color: theme.palette.primary.main, marginRight: '10px' }}>02.</span>
            Skills & Expertise
          </Typography>
        </Box>
      </motion.div>

      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: '2rem',
            marginTop: '3rem',
          }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              style={{ position: 'relative' }}
            >
              <AnimatePresence>
                {hoveredSkill === index && (
                  <motion.div
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}33, ${theme.palette.primary.main}99)`,
                      borderRadius: '4px',
                      zIndex: 2,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </AnimatePresence>
              
              <SkillItem elevation={0}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      backgroundColor: theme.palette.primary.main + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(10deg)',
                        backgroundColor: theme.palette.primary.main + '30',
                      },
                    }}
                  >
                    {skillGroup.icon && (
                      <Box
                        component="span"
                        sx={{
                          fontSize: '1.5rem',
                          color: theme.palette.primary.main,
                        }}
                      >
                        {skillGroup.icon}
                      </Box>
                    )}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      margin: 0,
                    }}
                  >
                    {skillGroup.category}
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gap: '1.2rem' }}>
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Tooltip 
                      key={`${skill.name}-${skillIndex}`} 
                      title={`${skill.level}% proficiency`} 
                      placement="top"
                      arrow
                    >
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.text.primary,
                              fontWeight: 500,
                            }}
                          >
                            {skill.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              fontFeatureSettings: '"tnum"',
                            }}
                          >
                            {skill.level}%
                          </Typography>
                        </Box>
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          <SkillBar 
                            level={skill.level}
                            style={{
                              '--progress': isInView ? `${skill.level}%` : '0%',
                            } as React.CSSProperties}
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
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </SkillItem>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
