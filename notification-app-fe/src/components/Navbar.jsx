import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Badge, 
  IconButton, 
  Box, 
  FormControlLabel, 
  Switch, 
  Tooltip,
  useTheme
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useNotifications } from '../hooks/useNotifications';

/**
 * Navbar component for the Campus Notifications System.
 * Displays application branding, real-time unread count stats,
 * and a developer toggle to test with mock fallback data.
 */
export const Navbar = () => {
  const { stats, useFallback, setUseFallback } = useNotifications();
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Brand Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SchoolIcon sx={{ fontSize: { xs: 28, md: 32 }, color: 'common.white' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              fontFamily: '"Outfit", sans-serif',
              background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            CampusNotify
          </Typography>
        </Box>

        {/* Action Controls & Notification Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
          
          {/* Debug/Mock Data Switch */}
          <Tooltip title="Toggle between local Mock Data and live API server" arrow>
            <FormControlLabel
              control={
                <Switch 
                  checked={useFallback} 
                  onChange={(e) => setUseFallback(e.target.checked)} 
                  color="warning"
                  size="small"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
                  <BugReportIcon fontSize="small" sx={{ color: useFallback ? 'warning.light' : 'inherit' }} />
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'inline' }, fontWeight: 500, fontSize: '0.8rem' }}>
                    Mock API Fallback
                  </Typography>
                </Box>
              }
              sx={{ 
                marginRight: 0, 
                color: 'common.white',
                '& .MuiFormControlLabel-label': { fontSize: '0.75rem' }
              }}
            />
          </Tooltip>

          {/* Unread Notifications Badge */}
          <Tooltip title={`${stats.unread} Unread Notifications`} arrow>
            <IconButton 
              size="large" 
              color="inherit" 
              sx={{ 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <Badge 
                badgeContent={stats.unread} 
                color="error" 
                max={99}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
                  }
                }}
              >
                <NotificationsIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
              </Badge>
            </IconButton>
          </Tooltip>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
