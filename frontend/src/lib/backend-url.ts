const DEFAULT_BACKEND_ORIGIN = "http://localhost:8080";

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

const configuredApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  `${DEFAULT_BACKEND_ORIGIN}/api`;
const configuredBackendUrl =
  process.env.BACKEND_URL || configuredApiUrl;

export const BACKEND_ORIGIN = trimTrailingSlashes(configuredBackendUrl)
  .replace(/\/api$/i, "");
export const BACKEND_API_URL = `${BACKEND_ORIGIN}/api`;

// Keep these aliases for existing frontend modules.
export const API_BASE_URL = BACKEND_API_URL;
export const BACKEND_URL = BACKEND_ORIGIN;
