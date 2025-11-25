/**
 * LocalStorage utility functions with error handling
 */

import { STORAGE_KEYS } from '../config/constants';

/**
 * Safely get item from localStorage
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safely set item to localStorage
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Get user info from localStorage
 */
export const getUserInfo = () => {
  return getStorageItem(STORAGE_KEYS.USER_INFO);
};

/**
 * Set user info to localStorage
 */
export const setUserInfo = (userInfo) => {
  return setStorageItem(STORAGE_KEYS.USER_INFO, userInfo);
};

/**
 * Remove user info from localStorage
 */
export const removeUserInfo = () => {
  return removeStorageItem(STORAGE_KEYS.USER_INFO);
};

/**
 * Get theme from localStorage
 */
export const getTheme = () => {
  return getStorageItem(STORAGE_KEYS.MAIN_THEME, 'lighttheme');
};

/**
 * Set theme to localStorage
 */
export const setTheme = (theme) => {
  return setStorageItem(STORAGE_KEYS.MAIN_THEME, theme);
};

