"use server";

import { cookies } from "next/headers";
import { IS_USER_LOGGEDIN_KEY } from "../_common/constants";
import { UserCookieValueType } from "../_common/types";

const DEFAULT_LOGIN_CHECK_KEY =
  IS_USER_LOGGEDIN_KEY;

const DEFAULT_COOKIE_KEY = "__user__";

export const getCookie = async (): Promise<{
  success: boolean;
  data: UserCookieValueType | null;
}> => {
  if (
    cookies().has(DEFAULT_COOKIE_KEY) &&
    cookies().has(DEFAULT_LOGIN_CHECK_KEY)
  ) {
    const isUserLoggedIn: boolean =
      cookies().get(DEFAULT_LOGIN_CHECK_KEY)
        ?.value === "false"
        ? false
        : true;

    if (isUserLoggedIn) {
      const userDetails: UserCookieValueType =
        JSON.parse(
          cookies().get(DEFAULT_COOKIE_KEY)!.value
        );

      return { success: true, data: userDetails };
    }
  }
  return { success: false, data: null };
};

export const setCookie = async (
  userData: UserCookieValueType
) => {
  if (
    cookies().has(DEFAULT_LOGIN_CHECK_KEY) &&
    cookies().get(DEFAULT_LOGIN_CHECK_KEY)!
      .value === "true"
  ) {
    const val: string = JSON.stringify(userData);
    cookies().set(DEFAULT_COOKIE_KEY, val);
  }
};
