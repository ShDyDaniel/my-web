import { NextResponse } from "next/server";
import {
  getMaintenanceModeState,
  setMaintenanceModeState,
} from "@/lib/maintenance-mode";

export const runtime = "nodejs";

const ADMIN_PASSWORD = "12321";

type MaintenanceUpdateBody = {
  enabled?: boolean;
  confirmPassword?: string;
};

function isAuthorized(request: Request) {
  return request.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const state = await getMaintenanceModeState();
    return NextResponse.json(state);
  } catch (error) {
    console.error("[admin-maintenance:get]", error);
    return NextResponse.json(
      { error: "Failed to load maintenance state" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as MaintenanceUpdateBody;

    if (typeof body.enabled !== "boolean") {
      return NextResponse.json({ error: "Missing enabled flag" }, { status: 400 });
    }

    if (body.confirmPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "נדרשת סיסמה לאישור הפעולה." },
        { status: 401 },
      );
    }

    const state = await setMaintenanceModeState(body.enabled);
    return NextResponse.json(state);
  } catch (error) {
    console.error("[admin-maintenance:post]", error);
    return NextResponse.json(
      { error: "Failed to update maintenance state" },
      { status: 500 },
    );
  }
}

