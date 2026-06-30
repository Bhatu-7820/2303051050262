import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

/**
 * Custom hook to safely and cleanly consume the NotificationContext.
 * 
 * @returns {object} The Notification Context value
 * @throws {Error} If called outside of a NotificationProvider
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
};

export default useNotifications;
