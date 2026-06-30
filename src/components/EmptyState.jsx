import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

/**
 * Clean and professional empty state component.
 * Displays "No Notifications Found" message as required.
 */
export const EmptyState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '280px',
        width: '100%',
        py: 8,
        px: 3,
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: 'background.paper',
        border: '1px dashed rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.02)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'action.hover',
          color: 'text.secondary',
          mb: 3
        }}
      >
        <InboxIcon sx={{ fontSize: 40, opacity: 0.5 }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 1,
          fontFamily: '"Outfit", sans-serif',
          color: 'text.primary'
        }}
      >
        No Notifications Found
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 320,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          mx: 'auto'
        }}
      >
        There are no updates matching your current type filters or page boundaries.
      </Typography>
    </Box>
  );
};

export default EmptyState;
