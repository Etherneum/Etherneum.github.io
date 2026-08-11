import { NextResponse } from "next/server";
import * as Tierlists from '../../../../data/tierlists';

export const dynamic = "force-dynamic";

export async function GET() {
  // Return the exported tierlists as JSON so the admin UI can edit/export them.
  return NextResponse.json({
    AUTO_TIER_CATEGORIES: Tierlists.AUTO_TIER_CATEGORIES,
    TANKS_TIER_LIST: Tierlists.TANKS_TIER_LIST,
    DAMAGE_DEALERS_TIER_LIST: Tierlists.DAMAGE_DEALERS_TIER_LIST,
    SUPPORT_TIER_LIST: Tierlists.SUPPORT_TIER_LIST,
    QUALITY_TIER_LIST: Tierlists.QUALITY_TIER_LIST,
  });
}
