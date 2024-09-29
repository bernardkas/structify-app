// An array of routes that are accessible to the public

export const publicRoutes = [''];

// Protected routes
export const authRoutes = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
  '/auth/new-verification',
];

// The prefix for API auth routes
export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
