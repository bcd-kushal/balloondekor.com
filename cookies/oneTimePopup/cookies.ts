"use server";
import { cookies } from "next/headers";

type CookieValueType = "true" | "false";

const DEFAULT_COOKIE_NAME: string =
  "__userVisited__";
const DEFAULT_COOKIE_VALUE: CookieValueType =
  "false";

export const getCookie = async () => {
  const cookieData = cookies();
  if (
    cookieData.has(DEFAULT_COOKIE_NAME) &&
    cookieData.get(DEFAULT_COOKIE_NAME)?.value
      .length
  )
    return (
      cookieData.get(DEFAULT_COOKIE_NAME)
        ?.value || DEFAULT_COOKIE_VALUE
    );
  await setCookie({ val: DEFAULT_COOKIE_VALUE });
  return DEFAULT_COOKIE_VALUE;
};

export const setCookie = async ({
  val
}: {
  val: CookieValueType;
}) => {
  const cookieData = cookies();
  cookieData.set(DEFAULT_COOKIE_NAME, val);
};
