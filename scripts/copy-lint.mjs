// Copy lint: NFT-era verbiage is banned from user-facing copy (house verb: etch).
// Scans string literals and JSDoc in src/ and .design-sync/previews/.
// Line-level opt-out: append  // copy-lint-ignore  (for back-compat API aliases).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const BANNED = /\b(mint(?:s|ed|ing)?|claim(?:s|ed|ing|able)?|drop(?:s|ped|ping)?|airdrop(?:s|ped)?|nft(?:s)?|gas)\b/i;

const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name));
    else if (/\.(tsx?|css)$/.test(e.name)) files.push(join(dir, e.name));
  }
};
walk("src");
try { walk(".design-sync/previews"); } catch {}

let failures = 0;
for (const f of files) {
  const lines = readFileSync(f, "utf-8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes("copy-lint-ignore")) return;
    // Only flag copy contexts: string literals, JSX text, comments — not identifiers.
    const copyish = line.match(/(["'`].*["'`])|(\/\*|\*|\/\/)|(>[^<>{}]*<)/);
    if (!copyish) return;
    const hit = line.match(BANNED);
    if (hit) {
      console.error(`${f}:${i + 1}: banned word "${hit[0]}" — use etch/inscribe language`);
      failures++;
    }
  });
}

if (failures) {
  console.error(`\ncopy-lint: ${failures} banned-verbiage hit(s). House verb is ETCH.`);
  process.exit(1);
}
console.log(`copy-lint: clean (${files.length} files)`);
