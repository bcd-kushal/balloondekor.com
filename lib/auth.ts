"use server";

import { getCookie } from "@/cookies/isLoggedin/cookie";

export async function isUserLoggedIn(): Promise<boolean> {
  const userLoginCookie: boolean =
    await getCookie();
  return userLoginCookie;
}
