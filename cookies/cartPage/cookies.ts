"use server";

import { cookies } from "next/headers";

const DEFAULT_COOKIE_KEY = "__cartPage__";
const DEFAULT_COOKIE_VALUE = "0";

export const getCartPageIndexCookie =
  async () => {
    if (cookies().has(DEFAULT_COOKIE_KEY))
      return cookies().get(DEFAULT_COOKIE_KEY)
        ?.value;
    return undefined;
  };

export const setCartPageIndexCookie = async (
  val: number
) => {
  const cookieVal = cookies().get(
    DEFAULT_COOKIE_KEY
  )?.value;

  if (
    (cookieVal && Number(cookieVal) !== 0) ||
    (!cookieVal && val !== 0) ||
    (cookieVal && val === 0)
  ) {
    cookies().set(
      DEFAULT_COOKIE_KEY,
      JSON.stringify(val)
    );
  }
};
