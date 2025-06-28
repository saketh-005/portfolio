import { Box, Typography, Button, useTheme, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ThankYou = () => {
  const theme = useTheme();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 10000);

    // Cleanup
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Thank You | Saketh Jangala</title>
        <meta name="description" content="Thank you for your message. I'll get back to you soon!" />
      </Head>
      
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              maxWidth: '600px',
              backgroundColor: theme.palette.background.paper,
              padding: { xs: '2rem', md: '3rem' },
              borderRadius: '8px',
              boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: theme.palette.success.light,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill={theme.palette.success.contrastText}
                  />
                </svg>
              </Box>
            </motion.div>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.5rem' },
                fontWeight: 700,
                marginBottom: '1rem',
                color: theme.palette.text.primary,
              }}
            >
              Thank You! 🎉
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              Your message has been sent successfully. I'll get back to you as soon as possible.
              In the meantime, feel free to explore more of my work or connect with me on social media.
              
              <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <CircularProgress size={24} color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Redirecting in {countdown} seconds...
                </Typography>
              </Box>
            </Typography>

            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    padding: '0.8rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '4px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 20px ${theme.palette.primary.main}33`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Back to Home
                </Button>
              </Link>
              
              <Link href="/#work" passHref>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    padding: '0.8rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '4px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View My Work
                </Button>
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default ThankYou;
