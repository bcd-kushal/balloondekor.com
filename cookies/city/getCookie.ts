"use server";
import { cookies } from "next/headers";
import setCityCookie from "./setCookie";

const CITY_COOKIE_NAME = "__curr_city__";

export default async function getCityCookie() {
  try {
    if (cookies().has(CITY_COOKIE_NAME)) {
      const currCity = cookies().get(
        CITY_COOKIE_NAME
      )?.value;
      return currCity;
    } else {
      setCityCookie({ value: "" });
      return null;
    }
  } catch (err) {
    setCityCookie({ value: "none" });
    return null;
  }
}
