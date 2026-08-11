const fs = require('fs');
const path = require('path');
const vm = require('vm');

function extractExports(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const re = /export\s+const\s+(\w+)\s*[:=][\s\S]*?=\s*([\[{][\s\S]*?[\]}]);/g;
  const out = {};
  let m;
  while ((m = re.exec(src))) {
    const name = m[1];
    const literal = m[2];
    try {
      // Evaluate the literal safely in a VM; it should be plain object/array literals
      const code = 'result = ' + literal;
      const ctx = { result: null };
      vm.createContext(ctx);
      vm.runInContext(code, ctx, { timeout: 1000 });
      out[name] = ctx.result;
    } catch (e) {
      // ignore eval errors
      // fallback: try to JSON.parse by replacing single quotes with double
      try {
        const json = literal.replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":').replace(/'/g, '"');
        out[name] = JSON.parse(json);
      } catch (e2) {
        // give up
        out[name] = null;
      }
    }
  }
  return out;
}

function extractUnitNames(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const names = new Set();
  const re = /u\(\s*"([^"]+)"\s*,/g;
  let m;
  while ((m = re.exec(src))) names.add(m[1]);
  // also extract keys in KNOWN_DETAIL_OVERRIDES like 'sakuna-heian': {
  const re2 = /(["']?([a-z0-9-]+)["']?)\s*:\s*\{/gi;
  while ((m = re2.exec(src))) {
    const key = m[2];
    // skip common identifiers
    if (key && key.length > 2) names.add(key.replace(/-/g, ' '));
  }
  return Array.from(names).sort();
}

function main() {
  const tierPath = path.join(__dirname, '..', 'data', 'tierlists.ts');
  const unitPath = path.join(__dirname, '..', 'data', 'unitDetails.ts');
  const outDir = path.join(__dirname, '..', 'public', 'admin');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const exports = extractExports(tierPath);
  fs.writeFileSync(path.join(outDir, 'tierlists.json'), JSON.stringify(exports, null, 2));
  console.log('Wrote tierlists.json');

  const units = extractUnitNames(unitPath);
  fs.writeFileSync(path.join(outDir, 'units.json'), JSON.stringify(units, null, 2));
  console.log('Wrote units.json');
}

main();
