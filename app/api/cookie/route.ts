import { getCookie } from "@/cookies/oneTimePopup/cookies";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse> {
  const cookieData = await getCookie();
  return NextResponse.json(cookieData, {
    status: 200
  });
}
