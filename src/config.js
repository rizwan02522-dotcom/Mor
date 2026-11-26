const envApiUrl = import.meta.env.VITE_API_URL;
const isLocalEnvUrl = envApiUrl && (envApiUrl.includes('localhost') || envApiUrl.includes('127.0.0.1'));

// In production (or on custom domains like multirecover.com), always use '/api' if VITE_API_URL points to localhost
export const API_URL = (import.meta.env.PROD && isLocalEnvUrl) ? '/api' : (envApiUrl || '/api');
