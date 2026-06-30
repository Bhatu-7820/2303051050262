import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Typography,
  Chip,
  Paper
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNotifications } from '../hooks/useNotifications';

/**
 * FilterBar component displaying Select input to filter by Notification Type.
 * Options: All, Placement, Result, Event.
 */
export const NotificationFilter = () => {
  const { filter, handleFilterChange, stats } = useNotifications();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3.5,
        backgroundColor: 'background.paper',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mb: 3
      }}
    >
      {/* Description Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <FilterListIcon sx={{ color: 'text.secondary' }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}>
            Updates Stream
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: -0.2 }}>
            Showing {stats.total} notification{stats.total !== 1 ? 's' : ''} ({stats.unread} unread)
          </Typography>
        </Box>
      </Box>

      {/* Filter Select Dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: { xs: '100%', sm: 200 } }}>
        <FormControl fullWidth size="small">
          <InputLabel id="filter-select-label" sx={{ fontWeight: 600 }}>
            Filter Category
          </InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filter}
            label="Filter Category"
            onChange={(e) => handleFilterChange(e.target.value)}
            sx={{
              borderRadius: 2.5,
              fontWeight: 600,
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
          >
            <MenuItem value="All" sx={{ fontWeight: 600 }}>
              All Categories
            </MenuItem>
            <MenuItem value="Placement" sx={{ fontWeight: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <span>Placement</span>
                <Chip label="High" size="small" color="error" variant="outlined" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800 }} />
              </Box>
            </MenuItem>
            <MenuItem value="Result" sx={{ fontWeight: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <span>Result</span>
                <Chip label="Medium" size="small" color="warning" variant="outlined" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800 }} />
              </Box>
            </MenuItem>
            <MenuItem value="Event" sx={{ fontWeight: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <span>Event</span>
                <Chip label="Normal" size="small" color="info" variant="outlined" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800 }} />
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default NotificationFilter;
