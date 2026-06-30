import React from 'react';
import { Alert, AlertTitle, Button, Box, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Error Alert component using MUI Alert with a Retry button.
 * 
 * @param {object} props
 * @param {string} props.message - Error message string
 * @param {Function} props.onRetry - Callback to retry operation
 */
export const ErrorAlert = ({ message, onRetry }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid rgba(211, 47, 47, 0.15)',
        overflow: 'hidden',
        my: 2
      }}
    >
      <Alert
        severity="error"
        variant="filled"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
              sx={{
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                px: 2,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)'
                }
              }}
            >
              Retry
            </Button>
          )
        }
        sx={{
          py: 2.5,
          px: { xs: 2, sm: 3 },
          alignItems: 'center',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle sx={{ fontWeight: 800, fontSize: '1rem', mb: 0.5 }}>
          Network Connection Failed
        </AlertTitle>
        <Box sx={{ opacity: 0.95, fontSize: '0.875rem' }}>
          {message || 'An error occurred while loading updates from the evaluation server.'}
        </Box>
      </Alert>
    </Paper>
  );
};

export default ErrorAlert;
