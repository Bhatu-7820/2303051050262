import axios from 'axios';
import { logAction } from '../middleware/logger';

const API_BASE_URL = 'http://4.224.186.213/evaluation-service';

// Standard mock data to use as a fallback if the API is offline or blocked
const MOCK_NOTIFICATIONS = [
  { id: "1", type: "Placement", message: "Google Hiring: SWE Role registration starts today.", timestamp: "2026-06-30 09:00:00" },
  { id: "2", type: "Result", message: "Spring Semester CSE-302 results have been published.", timestamp: "2026-06-29 14:30:00" },
  { id: "3", type: "Event", message: "Annual Tech Fest 'Innovate 2026' scheduled for next Friday.", timestamp: "2026-06-28 11:15:00" },
  { id: "4", type: "Placement", message: "Microsoft Off-Campus Drive: Link open for 2026 batch.", timestamp: "2026-06-30 10:30:00" },
  { id: "5", type: "Result", message: "Re-evaluation results for Maths-IV are now online.", timestamp: "2026-06-27 16:45:00" },
  { id: "6", type: "Event", message: "Seminar on Quantum Computing in Block C Seminar Hall at 2 PM.", timestamp: "2026-06-29 16:00:00" },
  { id: "7", type: "Placement", message: "Amazon Internship: Applied Science roles open.", timestamp: "2026-06-25 08:00:00" },
  { id: "8", type: "Event", message: "Campus-wide Hackathon registrations close tonight.", timestamp: "2026-06-28 23:59:00" },
  { id: "9", type: "Result", message: "Chemistry lab practical grades uploaded on portal.", timestamp: "2026-06-26 12:00:00" },
  { id: "10", type: "Placement", message: "Accenture placement drive schedule updated.", timestamp: "2026-06-24 15:30:00" },
  { id: "11", type: "Event", message: "Inter-college sports championship starts Monday.", timestamp: "2026-06-23 10:00:00" },
  { id: "12", type: "Result", message: "Economics minor course grades finalized.", timestamp: "2026-06-22 09:30:00" }
];

/**
 * Service to fetch notifications from the API.
 * Supports pagination parameters page and limit.
 * 
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of records per page
 * @param {boolean} useFallback - Force fallback mock data if desired
 * @returns {Promise<{ data: Array, total: number, isFallback: boolean }>}
 */
export const fetchNotifications = async (page = 1, limit = 10, useFallback = false) => {
  const url = `${API_BASE_URL}/notifications`;
  const params = { page, limit };

  logAction('API Request', { url, params });

  if (useFallback) {
    // Simulate API network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    const start = (page - 1) * limit;
    const paginatedMock = MOCK_NOTIFICATIONS.slice(start, start + limit);
    logAction('API Success', { source: 'Fallback Mock', count: paginatedMock.length });
    return {
      data: paginatedMock,
      total: MOCK_NOTIFICATIONS.length,
      isFallback: true
    };
  }

  try {
    const response = await axios.get(url, { params, timeout: 5000 });
    
    // Normalize response: API could return array directly or wrapped in data/notifications
    let notificationsArray = [];
    if (Array.isArray(response.data)) {
      notificationsArray = response.data;
    } else if (response.data && Array.isArray(response.data.notifications)) {
      notificationsArray = response.data.notifications;
    } else if (response.data && Array.isArray(response.data.data)) {
      notificationsArray = response.data.data;
    } else {
      // If response format is unrecognized, throw custom parsing error
      throw new Error('Unrecognized response format from API');
    }

    logAction('API Success', { count: notificationsArray.length });

    // Note: Since raw API may not return a "total count" header or property, 
    // we determine total items based on page limits or standard total estimate.
    return {
      data: notificationsArray,
      total: response.data.total || null,
      isFallback: false
    };
  } catch (error) {
    logAction('API Failure', { 
      message: error.message, 
      code: error.code,
      response: error.response ? error.response.status : 'No Response'
    });
    throw error;
  }
};
