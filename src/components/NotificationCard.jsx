import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Badge,
  useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { getPriorityColor, getPriority } from '../utils/priority';
import { formatDate, getRelativeTime } from '../utils/formatDate';

/**
 * Custom Notification Card displaying notification details.
 * Implements Viewed/Unread badges and Action handlers.
 * 
 * @param {object} props
 * @param {object} props.notification - Notification data
 * @param {boolean} props.isViewed - Viewed status flag
 * @param {Function} props.onMarkViewed - Event triggered when marking as read
 */
export const NotificationCard = ({ notification, isViewed, onMarkViewed }) => {
  const theme = useTheme();
  const { id, type, message, timestamp } = notification;

  const priorityVal = getPriority(type);
  const typeColor = getPriorityColor(priorityVal);

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 3,
        borderLeft: `6px solid ${typeColor}`,
        boxShadow: isViewed 
          ? '0 2px 8px 0 rgba(0,0,0,0.04)'
          : `0 4px 16px 0 rgba(${priorityVal === 3 ? '211, 47, 47' : priorityVal === 2 ? '237, 108, 2' : '2, 136, 209'}, 0.08)`,
        backgroundColor: isViewed ? 'background.paper' : '#fbfcfe',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        borderLeftColor: typeColor,
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px 0 rgba(0,0,0,0.08)'
        }
      }}
    >
      {/* Unviewed Badge Overlay */}
      {!isViewed && (
        <Badge
          color="error"
          variant="dot"
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            '& .MuiBadge-badge': {
              width: 10,
              height: 10,
              borderRadius: '50%'
            }
          }}
        />
      )}

      <CardContent sx={{ pt: 2.5, pb: 1, px: 3 }}>
        {/* Header Block: Type Chip and Viewed Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Chip
            label={type || 'Notification'}
            size="small"
            sx={{
              backgroundColor: `${typeColor}15`,
              color: typeColor,
              fontWeight: 800,
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: `1px solid ${typeColor}30`,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          />

          <Chip
            label={isViewed ? 'Viewed' : 'Unread'}
            size="small"
            color={isViewed ? 'default' : 'primary'}
            variant={isViewed ? 'outlined' : 'filled'}
            sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 22,
              borderRadius: '10px'
            }}
          />
        </Box>

        {/* Notification Message */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: isViewed ? 500 : 700,
            color: isViewed ? 'text.secondary' : 'text.primary',
            lineHeight: 1.5,
            mb: 2,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '0.975rem'
          }}
        >
          {message}
        </Typography>

        {/* Timestamp */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.75, 
            color: 'text.disabled',
            fontSize: '0.75rem',
            fontFamily: '"Plus Jakarta Sans", sans-serif'
          }}
        >
          <ScheduleIcon sx={{ fontSize: 14 }} />
          <span>{formatDate(timestamp)}</span>
          <Box component="span" sx={{ mx: 0.5, opacity: 0.5 }}>•</Box>
          <span style={{ fontWeight: 500 }}>{getRelativeTime(timestamp)}</span>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 2, pt: 0, justifyContent: 'flex-end' }}>
        {!isViewed ? (
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<MarkEmailReadIcon fontSize="small" />}
            onClick={() => onMarkViewed(id)}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: theme.palette.primary.dark
              }
            }}
          >
            Mark Viewed
          </Button>
        ) : (
          <Button
            size="small"
            variant="text"
            color="success"
            disabled
            startIcon={<CheckCircleIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.75rem',
              '&.Mui-disabled': {
                color: 'success.main',
                opacity: 0.7
              }
            }}
          >
            Read
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default NotificationCard;
