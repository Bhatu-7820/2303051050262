import React from 'react';
import { Stack, Typography, Box, Paper, Alert } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationCard from './NotificationCard';
import { useNotifications } from '../hooks/useNotifications';

/**
 * PriorityNotifications component rendering high-priority notifications (Placement, Result).
 * Displays in a dedicated widget/panel on the Dashboard page.
 */
export const PriorityNotifications = () => {
  const { priorityNotifications, viewedNotifications, markAsViewed } = useNotifications();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.02)',
        backgroundColor: 'background.paper',
        height: '100%'
      }}
    >
      {/* Title Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: 'error.light',
            color: 'error.contrastText',
            boxShadow: '0 4px 10px 0 rgba(211, 47, 47, 0.2)'
          }}
        >
          <CampaignIcon sx={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 850, fontFamily: '"Outfit", sans-serif' }}>
            Critical Alerts
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 555 }}>
            Placements & Academic Results
          </Typography>
        </Box>
      </Box>

      {/* List content */}
      {priorityNotifications.length === 0 ? (
        <Alert 
          severity="info" 
          variant="outlined"
          sx={{ 
            borderRadius: 2.5,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '0.85rem',
            border: '1px dashed rgba(2, 136, 209, 0.25)',
            py: 2
          }}
        >
          No critical placement or result alerts for this page boundary.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {priorityNotifications.map((notification) => {
            const isViewed = viewedNotifications.includes(notification.id);
            return (
              <NotificationCard
                key={`priority-${notification.id}`}
                notification={notification}
                isViewed={isViewed}
                onMarkViewed={markAsViewed}
              />
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default PriorityNotifications;
