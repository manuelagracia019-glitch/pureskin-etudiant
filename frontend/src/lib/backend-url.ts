const LOCAL_BACKEND_URL = "http://localhost:8080";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || `${LOCAL_BACKEND_URL}/api`
).replace(/\/+$/, "");

export const BACKEND_URL = (
  process.env.BACKEND_URL || API_BASE_URL.replace(/\/api\/?$/, "")
).replace(/\/+$/, "");
