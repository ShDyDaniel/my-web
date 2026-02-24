import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ADMIN_PASSWORD = "12321";
export const MAINTENANCE_BYPASS_COOKIE = "ds-maintenance-bypass";

type MaintenanceAccessBody = {
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as MaintenanceAccessBody;

    if (body.password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "סיסמה שגויה." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(MAINTENANCE_BYPASS_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error) {
    console.error("[maintenance-access]", error);
    return NextResponse.json({ error: "Failed to grant access" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(MAINTENANCE_BYPASS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

