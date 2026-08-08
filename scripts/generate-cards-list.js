// Generates public/cards/list.json at build time.
// This replaces the old app/api/cards/list/route.ts, which read the cards
// folder and unit data on every request. Since GitHub Pages only serves
// static files, we bake the same output to a JSON file during the build.
const fs = require("fs");
const path = require("path");

function normalizeId(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function prettifyName(basename) {
  return basename
    .replace(/[_-]+/g, " ")
    .replace(/\b(\w)/g, (m) => m.toUpperCase())
    .trim();
}

async function main() {
  // data/unitDetails.ts is TypeScript, so we use ts-node-less extraction via
  // a tiny esbuild-free approach: require the compiled units through
  // next's transpiler isn't available here, so we shell out to node with
  // ts-node is overkill — instead we parse UNIT_DETAILS with a lightweight
  // require of the TS file via the "esbuild-register" that Next already
  // depends on is also overkill. Simplest: use the same require hook Next
  // uses isn't available standalone, so we just re-implement by reading the
  // compiled units through a small TS->JS transpile using esbuild (a next
  // dependency) if present, otherwise fall back to requiring nothing and
  // only listing files.
  let UNITS = [];
  try {
    const esbuild = require("esbuild");
    const src = fs.readFileSync(path.join(__dirname, "..", "data", "unitDetails.ts"), "utf8");
    const { code } = await esbuild.transform(src, { loader: "ts", format: "cjs" });
    const mod = { exports: {} };
    const fn = new Function("module", "exports", "require", code);
    fn(mod, mod.exports, require);
    UNITS = mod.exports.UNIT_DETAILS || [];
  } catch (e) {
    console.warn("Could not load unit details for list.json, continuing with files only:", e.message);
  }

  const cardsDir = path.join(__dirname, "..", "public", "cards");
  let files = [];
  try {
    files = fs
      .readdirSync(cardsDir)
      .filter((f) => fs.statSync(path.join(cardsDir, f)).isFile())
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
  } catch (e) {
    files = [];
  }

  const map = new Map(UNITS.map((u) => [u.id, { ...u }]));

  files.forEach((file) => {
    const name = path.parse(file).name;
    const candidateId = normalizeId(name);
    const imageUrl = `/cards/${encodeURIComponent(file)}`;

    if (map.has(candidateId)) {
      map.get(candidateId).image = imageUrl;
    } else {
      map.set(candidateId, {
        id: candidateId,
        name: prettifyName(name),
        rarity: "Common",
        image: imageUrl,
      });
    }
  });

  const out = Array.from(map.values());
  fs.writeFileSync(path.join(cardsDir, "list.json"), JSON.stringify(out));
  console.log(`Wrote public/cards/list.json with ${out.length} entries.`);
}

main();
