export const TOKEN_MAX_AGE_LOGIN =
  30 * (24 * 60 * 60); // 7 days in seconds

export const TOKEN_MAX_AGE_LOGOUT = -1; // will expire immediately

const AUTH_API = "/api/frontend/auth";

export const VALIDATION_API = `${AUTH_API}/validate`;
export const LOGOUT_API = `${AUTH_API}/logout`;

const PASSWORD_AUTH_API = `${AUTH_API}/password`;
export const PASSWORD_CHECK_REGISTRATION_STATUS_API = `${PASSWORD_AUTH_API}/check`;
export const PASSWORD_REGISTER_API = `${PASSWORD_AUTH_API}/register`;
export const PASSWORD_LOGIN_API = `${PASSWORD_AUTH_API}/login`;

export const OTP_LENGTH = 4;
export const RESEND_OTP_TIME = 60; // in sec (min 60)

const OTP_AUTH_API = `${AUTH_API}/otp`;
export const RESEND_OTP_API = `${OTP_AUTH_API}/resend`;
export const SEND_OTP_API = `${OTP_AUTH_API}/send`;
export const VERIFY_OTP_API = `${OTP_AUTH_API}/verify`;

const WHATSAPP_OTP_AUTH_API = `${AUTH_API}/whatsapp`;
export const WHATSAPP_RESEND_OTP_API = `${WHATSAPP_OTP_AUTH_API}/resend`;
export const WHATSAPP_SEND_OTP_API = `${WHATSAPP_OTP_AUTH_API}/send`;
export const WHATSAPP_VERIFY_OTP_API = `${WHATSAPP_OTP_AUTH_API}/verify`;

export const GOOGLE_AUTH_API = `${AUTH_API}/google`;

export const AUTH_MESSAGES = [
  // "Trusted by Over 5 Lacs+ Clients",
  // "100% Safe & Secure",
  // "Professional Decorators",
  // "Easy Reschedule"
];
