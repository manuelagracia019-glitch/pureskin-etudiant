const DEFAULT_BACKEND_ORIGIN = 'http://localhost:8080';

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '');
}

const configuredBackendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
const normalizedBackendUrl = trimTrailingSlashes(configuredBackendUrl || DEFAULT_BACKEND_ORIGIN);

// BACKEND_URL should be the backend origin. Also accept NEXT_PUBLIC_API_URL with or without /api.
export const BACKEND_ORIGIN = normalizedBackendUrl.replace(/\/api$/i, '');
export const BACKEND_API_URL = `${BACKEND_ORIGIN}/api`;

