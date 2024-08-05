export const TOKEN_MAX_AGE_LOGIN =
  7 * (24 * 60 * 60); // 30 days in seconds

export const TOKEN_MAX_AGE_LOGOUT = -1; // will expire immediately

const AUTH_API = "/api/cms/auth";
export const LOGIN_API = `${AUTH_API}/login`;
export const LOGOUT_API = `${AUTH_API}/logout`;
export const VALIDATION_API = `${AUTH_API}/validate`;
