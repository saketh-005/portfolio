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
        mb: 4,
        maxWidth,
        mx: 'auto',
        position: 'relative',
        zIndex: 1,
        '&:not(:first-of-type)': {
          mt: { xs: 4, md: 6 },
        }
      }}
    >
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 700,
          mb: 1,
          lineHeight: 1.2,
          background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
          '&:after': {
            content: '""',
            display: 'block',
            width: '80px',
            height: '5px',
            background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
            margin: '1rem auto 0',
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
          variant="subtitle1"
          component="p"
          sx={{ 
            color: 'text.secondary',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            mt: 0.5,
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
