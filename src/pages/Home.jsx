import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Divider,
  IconButton,
  Collapse,
  Card,
  CardContent,
  useTheme,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TerminalIcon from '@mui/icons-material/Terminal';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import { useNotifications } from '../hooks/useNotifications';
import PriorityNotifications from '../components/PriorityNotifications';
import FilterBar from '../components/FilterBar';
import NotificationList from '../components/NotificationList';
import PaginationBar from '../components/PaginationBar';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

/**
 * Main Home Page Dashboard displaying Campus Notifications.
 * Features stats panels, critical alerts, general stream list, 
 * filters, pagination, and a live developer logs terminal.
 */
export const Home = () => {
  const theme = useTheme();
  const [logsOpen, setLogsOpen] = useState(false);
  const { 
    loading, 
    error, 
    handleRetry, 
    stats, 
    logs,
    markAllAsViewed
  } = useNotifications();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, flexGrow: 1 }}>
      
      {/* 1. Header Overview & Stats Card Grid */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 900, 
            fontFamily: '"Outfit", sans-serif',
            color: 'text.primary',
            mb: 0.5,
            letterSpacing: '-0.8px'
          }}
        >
          Campus Notification Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
          Centralized notifications hub for students and faculty.
        </Typography>

        <Grid container spacing={2}>
          {/* Total Notifications Card */}
          <Grid item xs={6} sm={3}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3.5, border: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#fff', textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                Total Messages
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: 'primary.main', fontFamily: '"Outfit", sans-serif' }}>
                {stats.total}
              </Typography>
            </Paper>
          </Grid>

          {/* Unread Notifications Card */}
          <Grid item xs={6} sm={3}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3.5, border: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#fff', textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                Unread Updates
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: stats.unread > 0 ? 'error.main' : 'success.main', fontFamily: '"Outfit", sans-serif' }}>
                {stats.unread}
              </Typography>
            </Paper>
          </Grid>

          {/* Critical Alerts Card */}
          <Grid item xs={6} sm={3}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3.5, border: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#fff', textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                Critical Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: 'warning.main', fontFamily: '"Outfit", sans-serif' }}>
                {stats.priorityCount}
              </Typography>
            </Paper>
          </Grid>

          {/* Mark All Viewed Card */}
          <Grid item xs={6} sm={3} sx={{ display: 'flex' }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              disabled={stats.unread === 0 || loading}
              onClick={markAllAsViewed}
              startIcon={<DoneAllIcon />}
              sx={{
                borderRadius: 3.5,
                border: '1px solid rgba(25, 118, 210, 0.15)',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                backgroundColor: 'background.paper',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  border: '1px solid rgba(25, 118, 210, 0.3)'
                }
              }}
            >
              Mark All Read
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* 2. Main content split layout */}
      <Grid container spacing={4}>
        {/* Left Side: Priority notifications (Critical Alerts) */}
        <Grid item xs={12} md={4.5}>
          <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
            <PriorityNotifications />
          </Box>
        </Grid>

        {/* Right Side: General notification stream with filter & pagination */}
        <Grid item xs={12} md={7.5}>
          <FilterBar />

          {/* Error and Loading handlers */}
          {error && (
            <Box sx={{ mb: 2 }}>
              <ErrorAlert message={error} onRetry={handleRetry} />
            </Box>
          )}

          {loading ? (
            <Loader />
          ) : (
            <Box>
              <NotificationList />
              {!error && stats.total > 0 && <PaginationBar />}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* 3. Real-Time Middleware Logs Terminal Dashboard */}
      <Paper
        elevation={0}
        sx={{
          mt: 6,
          borderRadius: 4,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          backgroundColor: '#0a0e17'
        }}
      >
        <Box 
          onClick={() => setLogsOpen(!logsOpen)}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 3, 
            py: 2, 
            cursor: 'pointer',
            userSelect: 'none',
            backgroundColor: '#111827',
            borderBottom: logsOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#e5e7eb' }}>
            <TerminalIcon sx={{ color: '#10b981', fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.5px' }}>
              LIVE MIDDLEWARE LOGGER
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace' }}>
              {logs.length} transitions registered
            </Typography>
            <IconButton size="small" sx={{ color: '#e5e7eb' }}>
              {logsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={logsOpen}>
          <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: 0 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box 
                sx={{ 
                  maxHeight: 250, 
                  overflowY: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: '#a7f3d0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.8
                }}
              >
                {logs.length === 0 ? (
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace' }}>
                    ~ Waiting for events to log... Try changing filters, pages, or clicking cards.
                  </Typography>
                ) : (
                  logs.map((log) => (
                    <Box 
                      key={log.id} 
                      sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 0.5, sm: 2 },
                        pb: 0.5,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      <Box sx={{ color: '#6b7280', minWidth: 80 }}>[{log.timestamp}]</Box>
                      <Box 
                        sx={{ 
                          fontWeight: 700, 
                          color: log.level === 'error' ? '#ef4444' : log.level === 'warn' ? '#f59e0b' : '#34d399',
                          minWidth: 150
                        }}
                      >
                        {log.action}
                      </Box>
                      <Box sx={{ color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                        {log.payload ? JSON.stringify(log.payload) : 'N/A'}
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Collapse>
      </Paper>

    </Container>
  );
};

export default Home;
