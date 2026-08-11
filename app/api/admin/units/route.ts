import { NextResponse } from "next/server";
import { UNITS } from '../../../../data/units';

export const dynamic = "force-dynamic";

export async function GET() {
  // Return unit names only to keep payload small for the admin UI
  return NextResponse.json(UNITS.map((u) => u.name));
}
