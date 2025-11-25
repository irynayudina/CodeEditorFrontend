/**
 * Error handling utilities
 */

/**
 * Extracts error message from various error formats
 * @param {Error|Object} error - Error object
 * @returns {string} - Error message
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  if (typeof error === 'string') return error;
  
  if (error?.message) return error.message;
  
  if (error?.response?.data?.message) return error.response.data.message;
  
  if (error?.data?.message) return error.data.message;
  
  if (error?.error) return error.error;
  
  return 'An unknown error occurred';
};

/**
 * Handles API errors consistently
 * @param {Error|Object} error - Error object
 * @param {Function} toast - Toast function from react-toastify
 * @param {string} defaultMessage - Default error message
 */
export const handleApiError = (error, toast, defaultMessage = 'Operation failed') => {
  const message = getErrorMessage(error) || defaultMessage;
  if (toast) {
    toast.error(message);
  } else {
    console.error(message, error);
  }
};

/**
 * Checks if error is a network error
 * @param {Error|Object} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error?.message === 'Network Error' || 
         error?.code === 'NETWORK_ERROR' ||
         !error?.response;
};

/**
 * Checks if error is an authentication error
 * @param {Error|Object} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error?.response?.status === 401 || 
         error?.status === 401;
};

