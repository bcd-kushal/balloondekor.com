"use server";
import { cookies } from "next/headers";

const DEFAULT_COOKIE_NAME = "__appliedCoupon__";
const DEFAULT_COOKIE_VALUE = "";

export const getCookie = () => {
  try {
    if (cookies().has(DEFAULT_COOKIE_NAME))
      return cookies().get(DEFAULT_COOKIE_NAME)
        ?.value;
    setCookie(DEFAULT_COOKIE_VALUE);
    return DEFAULT_COOKIE_VALUE;
  } catch (err: any) {
    setCookie(DEFAULT_COOKIE_VALUE);
    return DEFAULT_COOKIE_VALUE;
  }
};

export const setCookie = (val: string) => {
  cookies().set(DEFAULT_COOKIE_NAME, val);
};
