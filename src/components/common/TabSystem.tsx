import { Box, Tabs, Tab, Paper, useTheme, SvgIconProps } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

// Styled icon component to handle the icon styling
const StyledIcon = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
  '& svg': {
    fontSize: '1.1rem',
    marginBottom: '1px',
  },
});

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactElement<SvgIconProps>;
}

interface TabSystemProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabs: TabItem[];
  centered?: boolean;
  fullWidth?: boolean;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: boolean | 'auto' | true | false;
  allowScrollButtonsMobile?: boolean;
}

const TabSystem: React.FC<TabSystemProps> = ({
  value,
  onChange,
  tabs,
  centered = true,
  fullWidth = false,
  variant = 'standard',
  scrollButtons = 'auto',
  allowScrollButtonsMobile = true,
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: centered ? 'center' : 'flex-start',
        mb: 6,
        '& .MuiTabs-indicator': {
          height: '100%',
          borderRadius: '50px',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(144, 202, 249, 0.2)' 
            : 'rgba(25, 118, 210, 0.1)',
        },
        '& .MuiTab-root': {
          minWidth: '120px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
          '&.Mui-selected': {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Paper 
        elevation={0}
        sx={{
          display: 'inline-flex',
          borderRadius: '50px',
          p: 0.5,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
          boxShadow: theme.shadows[1],
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        <Tabs
          value={value}
          onChange={onChange}
          variant={variant}
          scrollButtons={scrollButtons}
          allowScrollButtonsMobile={allowScrollButtonsMobile}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-flexContainer': {
              gap: 1,
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab 
              key={tab.value}
              value={tab.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {tab.icon && (
                    <StyledIcon>
                      {React.cloneElement(tab.icon, { fontSize: 'small' })}
                    </StyledIcon>
                  )}
                  {tab.label}
                </Box>
              }
              sx={{
                minHeight: '36px',
                textTransform: 'none',
                '& .MuiTab-wrapper': {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                },
              }}
            />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
};

export default TabSystem;
