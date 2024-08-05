export type PasswordCheckCredentialsType = {
  mail: string;
};

export type PasswordRegistrationCredentialsType =
  {
    mail: string;
    mobileNumber: string;
    password: string;
  };

export type PasswordLoginCredentialsType = {
  mail: string;
  password: string;
};

export type SendOTPCredentialsType = {
  mobileNumber: string;
};

export type ResendOTPCredentialsType = {
  orderId: string;
};

export type VerifyOTPCredentialsType = {
  mobileNumber: string;
  orderId: string;
  otp: string;
};
