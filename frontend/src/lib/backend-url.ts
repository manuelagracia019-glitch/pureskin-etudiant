<<<<<<< HEAD
const LOCAL_BACKEND_URL = "http://localhost:8080";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || `${LOCAL_BACKEND_URL}/api`
).replace(/\/+$/, "");

export const BACKEND_URL = (
  process.env.BACKEND_URL || API_BASE_URL.replace(/\/api\/?$/, "")
).replace(/\/+$/, "");
=======
const DEFAULT_BACKEND_ORIGIN = 'http://localhost:8080';

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '');
}

const configuredBackendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
const normalizedBackendUrl = trimTrailingSlashes(configuredBackendUrl || DEFAULT_BACKEND_ORIGIN);

// BACKEND_URL should be the backend origin. Also accept NEXT_PUBLIC_API_URL with or without /api.
export const BACKEND_ORIGIN = normalizedBackendUrl.replace(/\/api$/i, '');
export const BACKEND_API_URL = `${BACKEND_ORIGIN}/api`;

>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27
