/**
 * API Configuration
 * 
 * This file contains the configuration for connecting to the backend API.
 * 
 * For Android Emulator: Use 10.0.2.2 to access localhost on your host machine
 * For iOS Simulator: Use localhost
 * For Physical Device: Use your computer's IP address (e.g., 192.168.1.X)
 */

// Default to Android emulator configuration
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:3000/api'  // Android emulator -> host machine
  : 'https://your-production-api.com/api';

export const config = {
  apiBaseUrl: API_BASE_URL,
  timeout: 30000, // 30 seconds
  
  // API Endpoints
  endpoints: {
    books: '/books',
    bookById: (id: number) => `/books/${id}`,
    booksBulk: '/books/bulk',
    sync: '/sync/pingo',
    syncHistory: '/sync/history',
    health: '/health',
  },
};

export default config;
