"use server";
import { cookies } from "next/headers";

const CITY_COOKIE_NAME = "__curr_city__";

export default async function setCityCookie({
  value
}: {
  value: string;
}) {
  try {
    cookies().set(CITY_COOKIE_NAME, value);
  } catch (err) {}
}
