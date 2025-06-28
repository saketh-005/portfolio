import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradientColors?: [string, string];
  align?: 'left' | 'center' | 'right';
  maxWidth?: string | number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  gradientColors = ['primary.main', 'secondary.main'],
  align = 'center',
  maxWidth = '700px'
}) => {
  const theme = useTheme();
  
  // Helper function to get color from theme or use the provided color
  const getColor = (color: string) => {
    if (color in theme.palette) {
      const paletteColor = theme.palette[color as keyof typeof theme.palette];
      return typeof paletteColor === 'object' && paletteColor !== null && 'main' in paletteColor 
        ? (paletteColor as { main: string }).main 
        : color;
    }
    return color;
  };

  const startColor = getColor(gradientColors[0]);
  const endColor = getColor(gradientColors[1]);
  
  return (
    <Box 
      sx={{ 
        textAlign: align,
        mb: 8,
        maxWidth,
        mx: 'auto',
        position: 'relative',
        zIndex: 1,
        '&:not(:first-of-type)': {
          mt: { xs: 6, md: 10 },
        }
      }}
    >
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
          fontWeight: 800,
          mb: 3,
          lineHeight: 1.1,
          background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          '&:after': {
            content: '""',
            display: 'block',
            width: '80px',
            height: '5px',
            background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
            margin: '1.5rem auto 0',
            borderRadius: '3px',
            position: 'relative',
            zIndex: 1,
          }
        }}
      >
        {title}
      </Typography>
      
      {subtitle && (
        <Typography 
          variant="h6"
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.7,
            px: { xs: 2, sm: 0 }
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
