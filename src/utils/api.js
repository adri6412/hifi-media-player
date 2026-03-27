/**
 * API utility functions for communicating with the Flask backend
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Make a POST request to the API
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - Data to send (optional)
 * @returns {Promise<Object>} - The response data
 */
export const apiPost = async (endpoint, data = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error(`API POST ${endpoint} error:`, error);
    return { 
      success: false, 
      error: error.message,
      message: `Errore di connessione: ${error.message}`
    };
  }
};

/**
 * Make a GET request to the API
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<Object>} - The response data
 */
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error(`API GET ${endpoint} error:`, error);
    return { 
      success: false, 
      error: error.message,
      message: `Errore di connessione: ${error.message}`
    };
  }
};

/**
 * Check if the API server is running
 * @returns {Promise<boolean>} - True if server is running
 */
export const checkApiServer = async () => {
  const result = await apiGet('/check');
  return result.success;
};

/**
 * System control API calls
 */
export const systemAPI = {
  update: () => apiPost('/update_system'),
  reboot: () => apiPost('/reboot'),
  shutdown: () => apiPost('/shutdown'),
  closeAndRestart: () => apiPost('/close_and_restart'),
  getSystemInfo: () => apiGet('/system_info'),
  getNetworkInfo: () => apiGet('/network_info'),
  configureNetwork: (config) => apiPost('/configure_network', config),
  showGlobalKeyboard: () => apiPost('/show_global_keyboard'),
  hideGlobalKeyboard: () => apiPost('/hide_global_keyboard'),
};