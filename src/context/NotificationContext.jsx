import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchNotifications } from '../services/notificationService';
import { sortNotifications } from '../utils/sortNotifications';
import { getPriority } from '../utils/priority';
import { logAction, logger } from '../middleware/logger';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  // State variables as required
  const [notifications, setNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const [viewedNotifications, setViewedNotifications] = useState([]);
  
  // Custom states for system logs and API modes to enhance developer visibility
  const [logs, setLogs] = useState([]);
  const [useFallback, setUseFallback] = useState(false); // Can toggle mock data in UI if API is blocked

  const limit = 10;

  // Real-time logging subscriber
  useEffect(() => {
    const unsubscribe = logger.subscribe((newLog, allLogs) => {
      setLogs([...allLogs]);
    });
    // Set initial logs
    setLogs(logger.getLogs());
    return () => unsubscribe();
  }, []);

  // Fetch notifications implementation
  const loadNotifications = useCallback(async (targetPage = page, forceMock = useFallback) => {
    setLoading(true);
    logAction('Loading Started', { page: targetPage, filter, useFallback: forceMock });
    setError(null);

    try {
      const response = await fetchNotifications(targetPage, limit, forceMock);
      const data = response.data || [];

      // Update notifications state
      setNotifications(data);

      // Derive and sort Top Priority Notifications (Placement = 3, Result = 2)
      const topPriority = data.filter(n => getPriority(n.type) >= 2);
      const sortedTopPriority = sortNotifications(topPriority);
      setPriorityNotifications(sortedTopPriority);

      logAction('Loading Finished', { success: true, count: data.length });
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications');
      setNotifications([]);
      setPriorityNotifications([]);
      logAction('Loading Finished', { success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  }, [page, filter, useFallback]);

  // Load notifications when page or fallback mode changes
  useEffect(() => {
    loadNotifications(page, useFallback);
  }, [page, useFallback, loadNotifications]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    logAction('Page Changed', { page: newPage });
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to page 1 on filter change
    logAction('Filter Changed', { filter: newFilter });
  }, []);

  // Handle marking notification as viewed
  const markAsViewed = useCallback((id) => {
    setViewedNotifications(prev => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      logAction('Notification Viewed', { id });
      return updated;
    });
  }, []);

  // Handle marking all notifications as viewed (extra convenience helper)
  const markAllAsViewed = useCallback(() => {
    const unreadIds = notifications
      .map(n => n.id)
      .filter(id => !viewedNotifications.includes(id));
      
    if (unreadIds.length > 0) {
      setViewedNotifications(prev => [...prev, ...unreadIds]);
      logAction('Notification Viewed', { ids: unreadIds });
    }
  }, [notifications, viewedNotifications]);

  // Retry handler for the ErrorAlert component
  const handleRetry = useCallback(() => {
    loadNotifications(page, useFallback);
  }, [loadNotifications, page, useFallback]);

  // Derived state: filtered and sorted general notifications
  const sortedAndFilteredNotifications = useMemo(() => {
    let list = [...notifications];
    
    // Apply filter if not "All"
    if (filter !== 'All') {
      list = list.filter(n => n.type && n.type.toLowerCase() === filter.toLowerCase());
    }

    // Sort notifications using the reusable utility (Priority descending, then timestamp descending)
    return sortNotifications(list);
  }, [notifications, filter]);

  // Notification stats
  const stats = useMemo(() => {
    const total = sortedAndFilteredNotifications.length;
    const viewed = sortedAndFilteredNotifications.filter(n => viewedNotifications.includes(n.id)).length;
    const unread = total - viewed;
    
    // Total priority items
    const priorityCount = priorityNotifications.length;

    return { total, viewed, unread, priorityCount };
  }, [sortedAndFilteredNotifications, viewedNotifications, priorityNotifications]);

  const value = {
    notifications: sortedAndFilteredNotifications,
    rawNotifications: notifications,
    priorityNotifications,
    loading,
    error,
    page,
    filter,
    viewedNotifications,
    logs,
    useFallback,
    stats,
    setUseFallback,
    handlePageChange,
    handleFilterChange,
    markAsViewed,
    markAllAsViewed,
    handleRetry
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
