// src/components/LoadingScreen.jsx
import React from 'react';
import { Atom } from 'react-loading-indicators';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#000000',
        }}
      >
      <div style={{ transform: 'scale(2)' }}>
  <Atom color="#32cd32" size="xlarge" text="" textColor="" />
</div>

&nbsp;
        <Typography sx={{ mt: 2, fontWeight: 600, color: '#32cd32' }}>
          Loading...
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoadingScreen;
