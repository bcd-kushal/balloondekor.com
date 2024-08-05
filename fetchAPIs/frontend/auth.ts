// constants
import { DOMAIN } from "@/constants/frontend/apiRoute";
import {
  VALIDATION_API,
  LOGOUT_API,
  PASSWORD_CHECK_REGISTRATION_STATUS_API,
  PASSWORD_LOGIN_API,
  PASSWORD_REGISTER_API,
  RESEND_OTP_API,
  SEND_OTP_API,
  VERIFY_OTP_API,
  WHATSAPP_RESEND_OTP_API,
  WHATSAPP_SEND_OTP_API,
  WHATSAPP_VERIFY_OTP_API,
  GOOGLE_AUTH_API
} from "@/constants/frontend/auth";
import { ResponseDataType } from "@/types/cms/api";

// types
import {
  PasswordCheckCredentialsType,
  PasswordLoginCredentialsType,
  PasswordRegistrationCredentialsType,
  ResendOTPCredentialsType,
  SendOTPCredentialsType,
  VerifyOTPCredentialsType
} from "@/types/frontend/auth";

// common
export const validateAuth =
  (): Promise<boolean> => {
    return new Promise(
      async (resolve, reject) => {
        try {
          const url: string = `${DOMAIN}${VALIDATION_API}`;

          const response: Response =
            await fetch(url);

          if (response.ok) {
            resolve(true);
          } else {
            reject(false);
          }
        } catch (error: any) {
          console.error(
            "Error Validating Authentication",
            error
          );

          reject(false);
        }
      }
    );
  };

export const logout = (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${LOGOUT_API}`;

      const response: Response = await fetch(url);

      if (response.ok) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error("Error Logging Out", error);

      reject(false);
    }
  });
};

// password
export const passwordCheckRegistrationStatus = (
  credentials: PasswordCheckCredentialsType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${PASSWORD_CHECK_REGISTRATION_STATUS_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(credentials)
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error(
        "Error Checking Customer",
        error
      );

      reject(false);
    }
  });
};

export const passwordRegister = (
  credentials: PasswordRegistrationCredentialsType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${PASSWORD_REGISTER_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(credentials)
        }
      );

      if (response.ok) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error(
        "Error Registering Customer",
        error
      );

      reject(false);
    }
  });
};

export const passwordLogin = (
  credentials: PasswordLoginCredentialsType
): Promise<{
  success: boolean;
  status: any;
  data: any;
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${PASSWORD_LOGIN_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(credentials)
        }
      );

      const userDetails: {
        data: any;
        status: any;
      } = await response.json();

      if (response.ok) {
        resolve({
          success: true,
          status: userDetails.status,
          data: userDetails.data
        });
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error("Error Logging In", error);

      reject(false);
    }
  });
};

// otp
export const sendOTP = (
  sendOTPCredentials: SendOTPCredentialsType
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${SEND_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(sendOTPCredentials)
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject("");
      }
    } catch (error: any) {
      console.error("Error Sending OTP", error);

      reject("");
    }
  });
};

export const resendOTP = (
  resendOTPCredentials: ResendOTPCredentialsType
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${RESEND_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(
            resendOTPCredentials
          )
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject("");
      }
    } catch (error: any) {
      console.error("Error Resending OTP", error);

      reject("");
    }
  });
};

export const verifyOTP = (
  verifyOTPCredentials: VerifyOTPCredentialsType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${VERIFY_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(
            verifyOTPCredentials
          )
        }
      );

      if (response.ok) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error("Error Verifying OTP", error);

      reject(false);
    }
  });
};

// whatsapp
export const sendWhatsappOTP = (
  sendOTPCredentials: SendOTPCredentialsType
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${WHATSAPP_SEND_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(sendOTPCredentials)
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject("");
      }
    } catch (error: any) {
      console.error("Error Sending OTP", error);

      reject("");
    }
  });
};

export const resendWhatsappOTP = (
  resendOTPCredentials: ResendOTPCredentialsType
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${WHATSAPP_RESEND_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(
            resendOTPCredentials
          )
        }
      );

      const responseData: ResponseDataType =
        await response.json();

      if (response.ok) {
        resolve(responseData.data);
      } else {
        reject("");
      }
    } catch (error: any) {
      console.error("Error Resending OTP", error);

      reject("");
    }
  });
};

export const verifyWhatsappOTP = (
  verifyOTPCredentials: VerifyOTPCredentialsType
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${WHATSAPP_VERIFY_OTP_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(
            verifyOTPCredentials
          )
        }
      );

      if (response.ok) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error("Error Verifying OTP", error);

      reject(false);
    }
  });
};

export const verifyGoogle = (
  code: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}${GOOGLE_AUTH_API}`;

      const response: Response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify({ code })
        }
      );

      if (response.ok) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error: any) {
      console.error(
        "Error Verifying Google",
        error
      );

      reject(false);
    }
  });
};
