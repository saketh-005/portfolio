import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  useTheme, 
  useMediaQuery, 
  Snackbar, 
  Alert, 
  IconButton 
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SectionHeader from '../common/SectionHeader';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; message?: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Submit to FormSubmit
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSnackbarMessage('Failed to send message. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const socialLinks = [
    { 
      icon: <GitHubIcon fontSize="large" />, 
      url: 'https://github.com/saketh-005',
      label: 'GitHub'
    },
    { 
      icon: <LinkedInIcon fontSize="large" />, 
      url: 'https://www.linkedin.com/in/saketh-jangala/',
      label: 'LinkedIn'
    },
    { 
      icon: <TwitterIcon fontSize="large" />, 
      url: 'https://twitter.com/yourusername',
      label: 'Twitter'
    },
    { 
      icon: <EmailIcon fontSize="large" />, 
      url: 'mailto:saketh.jangala@outlook.com',
      label: 'Email'
    },
  ];

  return (
    <Box
      ref={contactRef}
      id="contact"
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
        <SectionHeader 
          title="Get In Touch"
          subtitle="Feel free to reach out to me"
          gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
        />
      </motion.div>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: theme.palette.text.primary,
              }}
            >
              Let's work together
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '2rem',
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
              }}
            >
              I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </Typography>
            
            <Box sx={{ marginTop: '3rem' }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.2rem',
                  marginBottom: '1.5rem',
                  color: theme.palette.text.primary,
                }}
              >
                Connect with me
              </Typography>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>

        <Box>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSubmitted ? (
              <Box
                sx={{
                  width: '100%',
                  backgroundColor: theme.palette.background.paper,
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
                  textAlign: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
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
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    Message Sent Successfully! 🎉
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                    Usually within 24-48 hours.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsSubmitted(false)}
                    sx={{ mt: 2 }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <Box
                component="form"
                action={`https://formsubmit.co/${encodeURIComponent('saketh.jangala@outlook.com')}`}
                method="POST"
                onSubmit={handleSubmit}
                sx={{
                  width: '100%',
                  '& .MuiTextField-root': { mb: 2 },
                  backgroundColor: theme.palette.background.paper,
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
                }}
              >
                <input type="hidden" name="_subject" value="New message from portfolio contact form" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponse" value="Thank you for your message! I'll get back to you as soon as possible." />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_blacklist" value="spam, viagra, bitcoin" />
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={loading}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  disabled={loading}
                  multiline
                  rows={6}
                  fullWidth
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  }}
                  InputProps={{
                    style: {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{
                    marginTop: '1rem',
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
                    '&.Mui-disabled': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      opacity: 0.7,
                    },
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            )}
          </motion.div>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;