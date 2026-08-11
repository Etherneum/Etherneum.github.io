import { NextResponse } from "next/server";
import * as Values from "/workspaces/Etherneum.github.io/data/unitValues";

export async function GET() {
  return NextResponse.json({
    DEFAULT_MODIFIER_BONUSES: Values.DEFAULT_MODIFIER_BONUSES,
    MUTATION_VALUE_MULTIPLIERS: Values.MUTATION_VALUE_MULTIPLIERS,
  });
}
