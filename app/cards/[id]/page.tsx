import fs from "fs";
import path from "path";
import { UNITS } from "@/data/units";
import { normalizeId } from "@/data/unitDetails";
import {
  DEFAULT_MODIFIER_BONUSES,
  getModifierBreakdown,
} from "@/data/unitValues";
import CardDetail from "./CardDetail";

function prettifyName(basename: string) {
  return basename.replace(/[_-]+/g, " ").replace(/\b(\w)/g, (m) => m.toUpperCase()).trim();
}

function getCardFiles(): string[] {
  const cardsDir = path.join(process.cwd(), "public", "cards");
  try {
    return fs
      .readdirSync(cardsDir)
      .filter((f) => fs.statSync(path.join(cardsDir, f)).isFile());
  } catch (e) {
    return [];
  }
}

export async function generateStaticParams() {
  const files = getCardFiles();
  const ids = new Set<string>();

  UNITS.forEach((u) => ids.add(u.id));
  files.forEach((file) => ids.add(normalizeId(path.parse(file).name)));

  return Array.from(ids).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const files = getCardFiles();

  const normalizedId = normalizeId(id);

  const matchFile = files.find((file) => {
    const name = path.parse(file).name;
    const candidateId = normalizeId(name);
    return candidateId === normalizedId;
  });

  const unit = UNITS.find((u) => u.id === normalizedId);
  const imageUrl = matchFile ? `/cards/${encodeURIComponent(matchFile)}` : unit?.image;

  const displayName = unit ? unit.name : matchFile ? prettifyName(path.parse(matchFile).name) : id;
  const breakdown = unit ? getModifierBreakdown(unit, { mutation: null, trait: null, level: 1 }, DEFAULT_MODIFIER_BONUSES) : null;

  return (
    <div className="min-h-screen flex items-start justify-center py-8">
      <div className="w-full px-4">
        <CardDetail unit={unit} displayName={displayName} imageUrl={imageUrl} breakdown={breakdown} />
      </div>
    </div>
  );
}
