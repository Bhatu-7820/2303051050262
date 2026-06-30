import { getPriority } from './priority';

/**
 * Reusable utility to sort notifications first by priority (highest to lowest),
 * and then by timestamp (newest first) if priority levels are equal.
 * 
 * Priority levels:
 * - Placement (3)
 * - Result (2)
 * - Event (1)
 * 
 * @param {Array} notifications - List of notification objects
 * @returns {Array} Sorted notifications
 */
export const sortNotifications = (notifications) => {
  if (!Array.isArray(notifications)) return [];

  return [...notifications].sort((a, b) => {
    const priorityA = getPriority(a.type);
    const priorityB = getPriority(b.type);

    // 1. Sort by priority (descending: highest priority first)
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    // 2. Sort by timestamp if priority is the same (newest first)
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    
    return timeB - timeA;
  });
};
