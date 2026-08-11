import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pwd = String(body?.password ?? "");
    const secret = process.env.ADMIN_PASSWORD ?? "YBXII";
    if (pwd === secret) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
}
