/**
 * Application constants
 */

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://codeeditorbackend-production.up.railway.app';

export const API_ENDPOINTS = {
  AUTH: '/api/users/auth',
  REGISTER: '/api/users',
  LOGOUT: '/api/users/logout',
  PROFILE: '/api/users/profile',
  UPDATE_PROFILE: '/api/users/profile',
  FOLLOWING_FOLLOWERS: '/api/users/followingFollowers',
  DISCUSSIONS: '/api/discussions',
  DISCUSSIONS_ALL: '/api/discussions/all',
  PROJECTS: '/api/projects',
  COLLAB: '/api/collab',
  EXECUTE: '/editor/execute',
};

export const STORAGE_KEYS = {
  USER_INFO: 'userInfo',
  MAIN_THEME: 'mainThemeStored',
};

export const THEMES = {
  LIGHT: 'lighttheme',
  DARK: 'darktheme',
};

export const EDITOR_BREAKPOINTS = {
  SMALL: 814,
  LARGE: 1400,
};

export const DEFAULT_PAGE_SIZE = 10;

