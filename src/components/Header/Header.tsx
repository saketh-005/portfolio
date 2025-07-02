import React, { useState, useEffect, useRef } from 'react';
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

  // Notch system state
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [notchStyle, setNotchStyle] = useState({ left: 0, width: 0 });

  // Update notch position on hover/active
  useEffect(() => {
    const idx = hoveredIdx !== null ? hoveredIdx : activeIdx;
    const ref = navRefs.current[idx];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      const parentRect = ref.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setNotchStyle({ left: rect.left - parentRect.left, width: rect.width });
      }
    }
  }, [hoveredIdx, activeIdx]);

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/saketh-005' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/saketh-jangala/' },
    { icon: <XIcon />, url: 'https://x.com/saketh_jangala' },
    { icon: <EmailIcon />, url: 'mailto:saketh.jangala@outlook.com' },
  ];

  return (
    <AppBar
      elevation={0}
      sx={{
        background: 'none',
        boxShadow: 'none',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1.5,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(30,30,40,0.65)',
            borderRadius: 999,
            boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.12)',
            px: 2,
            py: 0.5,
            minHeight: 38,
            minWidth: 320,
            maxWidth: '90vw',
            gap: 1,
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255,255,255,0.13)',
          }}
        >
          {/* Notch highlight */}
          <Box
            sx={{
              position: 'absolute',
              top: 3,
              height: 'calc(100% - 6px)',
              borderRadius: 999,
              bgcolor: 'primary.main',
              opacity: 0.13,
              zIndex: 0,
              transition: 'left 0.3s cubic-bezier(.68,-0.55,.27,1.55), width 0.3s cubic-bezier(.68,-0.55,.27,1.55)',
              pointerEvents: 'none',
              ...notchStyle,
            }}
          />
          {/* Nav links */}
          {navItems.map((item, idx) => (
            <Button
              key={item.name}
              ref={el => { navRefs.current[idx] = el; return undefined; }}
              color="inherit"
              sx={{
                zIndex: 1,
                fontWeight: 600,
                fontSize: '1rem',
                px: 2,
                py: 0.5,
                borderRadius: 999,
                color: activeIdx === idx ? 'primary.main' : 'text.primary',
                transition: 'color 0.2s',
                minWidth: 0,
                background: 'none',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => {
                setActiveIdx(idx);
                const el = document.getElementById(item.to);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
