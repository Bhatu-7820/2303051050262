import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * High-quality full-width overlay loading indicator using MUI CircularProgress.
 * Implements smooth visual transition for loaders.
 */
export const Loader = ({ message = 'Loading notifications...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '250px',
        width: '100%',
        py: 6,
        gap: 2
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={50}
          thickness={4.5}
          sx={{
            color: 'primary.main',
            strokeLinecap: 'round'
          }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          animation: 'pulse 1.5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 }
          }
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
