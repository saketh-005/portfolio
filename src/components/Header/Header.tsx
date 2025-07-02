import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useScrollTrigger, Slide, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink } from 'react-scroll';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/saketh-005' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/saketh-jangala/' },
    { icon: <XIcon />, url: 'https://x.com/saketh_jangala' },
    { icon: <EmailIcon />, url: 'mailto:saketh.jangala@outlook.com' },
  ];

  return (
    <HideOnScroll>
      <AppBar
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          padding: '0 10%',
        }}
      >
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem 0',
        }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    color="inherit"
                    sx={{
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: '0',
                        left: '50%',
                        backgroundColor: theme.palette.primary.main,
                        transition: 'all 0.3s ease-in-out',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover:after': {
                        width: '100%',
                      },
                      color: 'text.primary',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: theme.palette.primary.main }}>0{navItems.indexOf(item) + 1}.</span> {item.name}
                  </Button>
                </ScrollLink>
              ))}
              <Button
                variant="outlined"
                color="primary"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    border: `1px solid ${theme.palette.primary.main}`,
                  },
                  marginLeft: '1rem',
                }}
              >
                Resume
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                {socialLinks.map((social, idx) => (
                  <IconButton
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
              <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
