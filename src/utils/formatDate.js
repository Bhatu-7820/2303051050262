/**
 * Utility to format ISO or space-separated date strings (e.g., "2026-04-22 17:51:18")
 * into user-friendly formatted date strings.
 * 
 * @param {string} dateString - The raw timestamp from the API
 * @returns {string} Human-readable date-time representation
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  try {
    // Standardize space-separated format (e.g. "2026-04-22 17:51:18") by replacing space with 'T'
    const normalizedString = dateString.includes(' ') && !dateString.includes('T')
      ? dateString.replace(' ', 'T')
      : dateString;

    const date = new Date(normalizedString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if parsing fails
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

/**
 * Calculates a relative time label (e.g. "2 hours ago", "Yesterday").
 * 
 * @param {string} dateString - The raw timestamp
 * @returns {string} Relative time label
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';

  try {
    const normalizedString = dateString.includes(' ') && !dateString.includes('T')
      ? dateString.replace(' ', 'T')
      : dateString;
      
    const date = new Date(normalizedString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    if (diffMs < 0 || isNaN(diffMs)) return formatDate(dateString);

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return formatDate(dateString);
  } catch (e) {
    return formatDate(dateString);
  }
};
