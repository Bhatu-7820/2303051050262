/**
 * Custom Logger Utility that stores log events in-memory.
 * Avoids raw `console.log` calls to maintain production compliance,
 * instead using structured `console.info` / `console.error` and an in-memory
 * state buffer that can be displayed interactively in the developer UI panel.
 */
class Logger {
  constructor() {
    this.logs = [];
    this.listeners = new Set();
  }

  /**
   * Log an event with action name and details
   * @param {string} action - Action name (e.g. "API Request", "Filter Changed")
   * @param {any} payload - Associated payload or details
   * @param {string} level - Log level ('info' | 'error' | 'warn')
   */
  log(action, payload = null, level = 'info') {
    const logEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      action,
      payload,
      level
    };

    this.logs.unshift(logEntry); // Newest first

    // Limit memory footprint to last 100 logs
    if (this.logs.length > 100) {
      this.logs.pop();
    }

    // Call console methods matching levels, but not raw console.log
    const message = `[LOG] [${logEntry.timestamp}] ${action}`;
    if (level === 'error') {
      console.error(message, payload || '');
    } else if (level === 'warn') {
      console.warn(message, payload || '');
    } else {
      console.info(message, payload || '');
    }

    // Notify listeners (e.g., React Context for live updates)
    this.listeners.forEach((listener) => listener(logEntry, this.logs));
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
    this.listeners.forEach((listener) => listener(null, this.logs));
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }
}

export const logger = new Logger();

/**
 * Middleware function/wrapper to log transitions and state modifications.
 * Logs all actions listed in requirements:
 * - API Request
 * - API Success
 * - API Failure
 * - Filter Changed
 * - Page Changed
 * - Notification Viewed
 * - Loading Started
 * - Loading Finished
 */
export const logAction = (action, payload) => {
  let level = 'info';
  if (action === 'API Failure') {
    level = 'error';
  }
  logger.log(action, payload, level);
};
