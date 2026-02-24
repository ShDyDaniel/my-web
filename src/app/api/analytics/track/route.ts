import { NextResponse } from "next/server";
import { trackTrafficEvent } from "@/lib/traffic-analytics";

export const runtime = "nodejs";

type TrackRequestBody = {
  path?: string;
  clientId?: string;
};

function sanitizePath(input: unknown) {
  if (typeof input !== "string" || !input.trim()) {
    return "/";
  }

  if (!input.startsWith("/")) {
    return `/${input}`;
  }

  return input.slice(0, 200);
}

function sanitizeClientId(input: unknown) {
  if (typeof input !== "string" || !input.trim()) {
    return "";
  }

  return input.slice(0, 128);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as TrackRequestBody;
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
    const ipHint = forwardedFor.split(",")[0]?.trim() || undefined;
    const clientId = sanitizeClientId(body.clientId);

    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    await trackTrafficEvent({
      path: sanitizePath(body.path),
      clientId,
      userAgent,
      ipHashHint: ipHint ? ipHint.slice(0, 64) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics-track]", error);
    return NextResponse.json({ error: "Track failed" }, { status: 500 });
  }
}
