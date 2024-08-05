"use server";

import { cookies } from "next/headers";
import { IS_USER_LOGGEDIN_KEY } from "../_common/constants";

const DEFAULT_COOKIE_KEY = IS_USER_LOGGEDIN_KEY;
const DEFAULT_COOKIE_VALUE = false;

export const setCookie = async (val: boolean) => {
  cookies().set(DEFAULT_COOKIE_KEY, String(val));
};

export const getCookie =
  async (): Promise<boolean> => {
    if (cookies().has(DEFAULT_COOKIE_KEY)) {
      const cookie = cookies().get(
        DEFAULT_COOKIE_KEY
      )?.value;
      return cookie === "false" ? false : true;
    }
    setCookie(DEFAULT_COOKIE_VALUE);
    return DEFAULT_COOKIE_VALUE;
  };
