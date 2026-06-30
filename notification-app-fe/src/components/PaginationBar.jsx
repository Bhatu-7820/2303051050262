import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNotifications } from '../hooks/useNotifications';

/**
 * PaginationBar component for navigating through notification pages.
 * Displays Previous, Next buttons and Current Page label.
 */
export const PaginationBar = () => {
  const { 
    page, 
    handlePageChange, 
    rawNotifications, // API raw response length for the page
    loading
  } = useNotifications();

  // If there are less notifications than the API limit (10), we are on the last page.
  // This is a robust fallback when total count is not provided by the API.
  const limit = 10;
  const isFirstPage = page === 1;
  const isLastPage = rawNotifications.length < limit;

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 3.5,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.02)',
        backgroundColor: 'background.paper',
        mt: 3
      }}
    >
      {/* Previous Button */}
      <Button
        variant="outlined"
        color="primary"
        disabled={isFirstPage || loading}
        onClick={() => handlePageChange(page - 1)}
        startIcon={<NavigateBeforeIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 2.5,
          px: { xs: 1.5, sm: 2.5 }
        }}
      >
        Previous
      </Button>

      {/* Current Page Status */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: '"Outfit", sans-serif',
            color: 'text.primary'
          }}
        >
          Page {page}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary', 
            fontWeight: 500,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          Viewing entries {(page - 1) * limit + 1} - {(page - 1) * limit + rawNotifications.length}
        </Typography>
      </Box>

      {/* Next Button */}
      <Button
        variant="outlined"
        color="primary"
        disabled={isLastPage || loading}
        onClick={() => handlePageChange(page + 1)}
        endIcon={<NavigateNextIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 2.5,
          px: { xs: 1.5, sm: 2.5 }
        }}
      >
        Next
      </Button>
    </Paper>
  );
};

export default PaginationBar;
