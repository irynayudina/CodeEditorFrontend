/**
 * Environment configuration
 * Validates required environment variables
 */

const requiredEnvVars = [];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};

// Validate on import
validateEnv();

export default {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://codeeditorbackend-production.up.railway.app',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

