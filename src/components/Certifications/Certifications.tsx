import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery, 
  Button,
  Chip,
  ButtonGroup
} from '@mui/material';
import TabSystem, { TabItem } from '../common/TabSystem';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionHeader from '../common/SectionHeader';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  credentialUrl?: string | string[];
  skills?: string[];
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'GEN AI Using IBM Watsonx',
    issuer: 'IBM',
    date: 'Jun 2025',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    credentialId: '5cb6ce9a061f4d8b919408b83ba3fea0',
    credentialUrl: 'https://courses.vit.skillsnetwork.site/certificates/5cb6ce9a061f4d8b919408b83ba3fea0',
    skills: ['IBM Watson', 'Generative AI']
  },
  {
    id: 2,
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia',
    date: 'May 2025',
    image: '/logos/deloitte-logo.png',
    credentialId: 'pPDHbW6tFHGhGDsi5',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_DDxHnq9BqFxN5dSZX_1746294150055_completion_certificate.pdf',
    skills: ['Data Analytics', 'Business Intelligence']
  },
  {
    id: 3,
    title: 'Cybersecurity Job Simulation',
    issuer: 'Mastercard',
    date: 'May 2025',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg',
    credentialId: 'XsKwwTyaj4SsMGYMw',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_DDxHnq9BqFxN5dSZX_1748181338919_completion_certificate.pdf',
    skills: ['Cybersecurity', 'Information Security']
  },
  {
    id: 4,
    title: 'iOS Development for Beginners',
    issuer: 'GeeksforGeeks',
    date: 'May 2025',
    image: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
    credentialId: 'fc4b8392a8f592d692eb77f35fce763f',
    credentialUrl: 'https://media.geeksforgeeks.org/courses/certificates/fc4b8392a8f592d692eb77f35fce763f.pdf',
    skills: ['Swift', 'iOS Development']
  },
  {
    id: 5,
    title: 'Advanced Learning Algorithms',
    issuer: 'DeepLearning.AI',
    date: 'Mar 2025',
    image: 'https://cdn-1.webcatalog.io/catalog/deeplearning-ai/deeplearning-ai-icon-filled-256.webp?v=1718611604869',
    credentialId: '6YVD94BL06FU',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/6YVD94BL06FU',
    skills: ['Machine Learning', 'AI']
  },
  {
    id: 6,
    title: 'Supervised Machine Learning',
    issuer: 'DeepLearning.AI',
    date: 'Mar 2025',
    image: 'https://cdn-1.webcatalog.io/catalog/deeplearning-ai/deeplearning-ai-icon-filled-256.webp?v=1718611604869',
    credentialId: 'XG16SWU4INSI',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/XG16SWU4INSI',
    skills: ['Machine Learning', 'AI', 'Regression', 'Classification']
  },
  {
    id: 7,
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    date: 'Dec 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    credentialId: 'fee27410b7dd',
    credentialUrl: 'https://www.hackerrank.com/certificates/fee27410b7dd',
    skills: ['Python', 'Problem Solving']
  },
  {
    id: 8,
    title: 'Crash Course on Python',
    issuer: 'Google',
    date: 'Dec 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    credentialId: 'QJXQ5S4V4Q6W',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/QJXQ5S4V4Q6W',
    skills: ['Python', 'Programming Fundamentals']
  },
  {
    id: 9,
    title: 'Programming in C',
    issuer: 'IIT Bombay',
    date: 'Apr 2024',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1920px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
    credentialUrl: 'https://drive.google.com/file/d/1xW3j2yX-VDQ7Ge2nbZq95_it2-cDXtYP/view?usp=sharing',
    skills: ['C Programming']
  },
  {
    id: 10,
    title: 'Programming in C++',
    issuer: 'IIT Bombay',
    date: 'Apr 2024',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1920px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
    credentialUrl: 'https://drive.google.com/file/d/1c6sm7NUJGU5TOxvEpbcwTITjM-oqaj3V/view?usp=sharing',
    skills: ['C++']
  },
  {
    id: 11,
    title: 'Python 3.4.3',
    issuer: 'IIT Bombay',
    date: 'Apr 2024',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1920px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
    credentialUrl: 'https://drive.google.com/file/d/1xIm_dmjRzxGsmzbtgH3t0V78eKCSLfUe/view?usp=sharing',
    skills: ['Python', 'Programming']
  },
  {
    id: 12,
    title: 'Introduction to IoT',
    issuer: 'Cisco',
    date: 'Jan 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    credentialId: '070d620e-03ef-4a9a-a35d-7bf75eb9c452',
    credentialUrl: [
      'https://www.credly.com/badges/070d620e-03ef-4a9a-a35d-7bf75eb9c452/linked_in_profile',
      'https://drive.google.com/file/d/110MqgQlilSL0cg524wIsonJlqGJEadc_/view?usp=drive_link'
    ],
    skills: ['Internet of Things', 'Networking']
  },
  {
    id: 13,
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn',
    date: 'Jan 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    credentialId: '3e0c8aadc6c65fcb73550753191d6c7e8b245cb16a997d424cc5eceee512d125',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/3e0c8aadc6c65fcb73550753191d6c7e8b245cb16a997d424cc5eceee512d125',
    skills: ['Generative AI', 'AI Fundamentals', 'Machine Learning']
  }
];

const Certifications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeFilter, setActiveFilter] = useState<'all' | 'technical' | 'professional'>('all');
  
  const filterTabs: TabItem[] = [
    { value: 'all', label: 'All', icon: <AllInclusiveIcon /> },
    { value: 'technical', label: 'Technical', icon: <CodeIcon /> },
    { value: 'professional', label: 'Professional', icon: <SchoolIcon /> },
  ];
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveFilter(newValue as 'all' | 'technical' | 'professional');
  };
  const [visibleCerts, setVisibleCerts] = useState(isMobile ? 6 : 9);
  const showLoadMore = visibleCerts < certifications.length;

  const filteredCertifications = certifications.filter(cert => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'technical') return cert.skills?.some(skill => 
      ['Python', 'Machine Learning', 'AI', 'Swift', 'iOS Development', 'Cybersecurity', 'IBM Watson', 'Generative AI'].includes(skill)
    );
    return cert.skills?.some(skill => 
      ['Business Intelligence', 'Information Security', 'Problem Solving'].includes(skill)
    );
  }).slice(0, visibleCerts);

  const loadMore = () => {
    setVisibleCerts(prev => Math.min(prev + (isMobile ? 2 : 3), certifications.length));
  };

  return (
    <Box 
      id="certifications"
      component="section"
      sx={{ 
        py: { xs: 6, md: 10 },
        position: 'relative',
        bgcolor: 'background.default',
        scrollMarginTop: '80px',
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
        title="Certifications"
        subtitle="My professional certifications and achievements"
        gradientColors={[theme.palette.primary.main, theme.palette.secondary.main]}
      />

      <Box sx={{ mt: 6, mb: 8 }}>
        <TabSystem
          value={activeFilter}
          onChange={handleTabChange}
          tabs={filterTabs}
          variant="scrollable"
          scrollButtons="auto"
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: '2rem',
        }}
      >
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box 
                  sx={{ 
                    padding: '1.5rem 1.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <Box
                    component="img"
                    src={cert.image}
                    alt={cert.issuer}
                    sx={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      backgroundColor: 'transparent',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: '4px',
                      padding: '4px',
                      boxSizing: 'border-box',
                      opacity: 0.9,
                    }}
                  />
                  <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {cert.title}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                      {cert.issuer}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ padding: '0 1.5rem 1.5rem', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Issued {cert.date}
                    </Typography>
                    {cert.credentialId && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.7rem',
                          color: theme.palette.text.secondary,
                          opacity: 0.7,
                        }}
                      >
                        • ID: {cert.credentialId.substring(0, 6)}...
                      </Typography>
                    )}
                  </Box>


                  {cert.skills && cert.skills.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', mb: 2 }}>
                      {cert.skills.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          sx={{
                            height: '22px',
                            fontSize: '0.65rem',
                            fontWeight: 500,
                            backgroundColor: `${theme.palette.primary.main}15`,
                            color: theme.palette.primary.main,
                            '& .MuiChip-label': {
                              padding: '0 8px',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {(cert.credentialId || cert.credentialUrl) && (
                    <ButtonGroup
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        mt: 1,
                        '& .MuiButton-root': {
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          color: theme.palette.text.secondary,
                          borderColor: theme.palette.divider,
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: `${theme.palette.primary.main}08`,
                          },
                        },
                      }}
                    >
                      {Array.isArray(cert.credentialUrl) ? (
                        cert.credentialUrl.map((url, idx) => (
                          <Button
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            endIcon={<ExpandMoreIcon sx={{ transform: 'rotate(-90deg)' }} />}
                          >
                            {idx === 0 ? 'View Badge' : 'View Certificate'}
                          </Button>
                        ))
                      ) : (
                        <Button
                          href={cert.credentialUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<ExpandMoreIcon sx={{ transform: 'rotate(-90deg)' }} />}
                        >
                          View Certificate
                        </Button>
                      )}
                    </ButtonGroup>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {showLoadMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Button
              variant="outlined"
              onClick={loadMore}
              endIcon={<ExpandMoreIcon />}
              sx={{
                padding: '0.5rem 2rem',
                borderRadius: '50px',
                textTransform: 'none',
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Certifications;
