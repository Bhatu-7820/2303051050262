import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import NotificationCard from './NotificationCard';
import EmptyState from './EmptyState';
import { useNotifications } from '../hooks/useNotifications';

/**
 * NotificationList component to display the list of sorted and filtered notifications.
 * Renders EmptyState if no notifications are loaded.
 */
export const NotificationList = () => {
  const { notifications, viewedNotifications, markAsViewed } = useNotifications();

  if (!notifications || notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box>
      <Stack spacing={2.5}>
        {notifications.map((notification) => {
          const isViewed = viewedNotifications.includes(notification.id);
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
              isViewed={isViewed}
              onMarkViewed={markAsViewed}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default NotificationList;
