import { NextResponse } from "next/server";
import { getTrafficSummary } from "@/lib/traffic-analytics";

export const runtime = "nodejs";

const ADMIN_PASSWORD = "12321";

export async function GET(request: Request) {
  const password = request.headers.get("x-admin-password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await getTrafficSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[admin-traffic]", error);
    return NextResponse.json({ error: "Failed to load traffic" }, { status: 500 });
  }
}
