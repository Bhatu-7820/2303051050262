/**
 * Utility to resolve numeric priority based on notification type.
 * Priority Rules:
 * - Placement = 3
 * - Result = 2
 * - Event = 1
 * - Default/Other = 0
 * 
 * @param {string} type - The notification type
 * @returns {number} The numeric priority level
 */
export const getPriority = (type) => {
  if (!type) return 0;
  const normalizedType = type.trim().toLowerCase();
  switch (normalizedType) {
    case 'placement':
      return 3;
    case 'result':
      return 2;
    case 'event':
      return 1;
    default:
      return 0;
  }
};

/**
 * Returns color hex/theme string matching the priority.
 * Useful for UI badges and card styling to maintain rich aesthetics.
 * 
 * @param {number|string} priorityOrType - The numeric priority level or the string type
 * @returns {string} Severity color key ('error', 'warning', 'info', 'success')
 */
export const getPriorityColor = (priorityOrType) => {
  const priority = typeof priorityOrType === 'number' 
    ? priorityOrType 
    : getPriority(priorityOrType);

  switch (priority) {
    case 3:
      return '#d32f2f'; // Error/Red for Placement
    case 2:
      return '#ed6c02'; // Warning/Orange for Result
    case 1:
      return '#0288d1'; // Info/Blue for Event
    default:
      return '#757575'; // Neutral grey for default
  }
};
