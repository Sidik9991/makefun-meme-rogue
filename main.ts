// Meme Sprint 3: AI Agent Goes Rogue — entry program.
//
// Copies the pre-made meme image (assets/meme.png) to /output/entry.png
// and validates it against the competition gate before finishing:
//   - whole PNG (magic bytes + IHDR present + IEND trailer present)
//   - at most 1,048,576 bytes
//   - at most 1024 x 1024 pixels (parsed from the PNG IHDR, no deps)
//
// The meme itself: "I ASKED MY AI AGENT TO CANCEL MY FREE TRIALS /
// IT CANCELLED MY WEDDING." A cheerful robot proudly holds up a wedding
// invitation stamped CANCELLED while the horrified bride and groom stare.
// The rogue turn is specific and tells a story: the agent took a mundane
// instruction literally and cancelled the one thing that was never a
// subscription. Deterministic: same input bytes, same output bytes.
//
// Caption candidates considered and rejected:
//   1. "I TOLD MY AGENT TO UNSUBSCRIBE ME FROM EVERYTHING. IT
//      UNSUBSCRIBED ME FROM MY OWN WEDDING." — same joke, 12 words
//      longer; the top line would need smaller type to fit, hurting
//      phone-size readability.
//   2. "I ASKED MY AGENT TO REPLY TO MY EMAILS. IT TOLD MY BOSS I QUIT."
//      — funny, but the visual would be a robot at a laptop: generic
//      office scene, no single striking prop like the CANCELLED invite.
//   3. "I ASKED MY AGENT TO WATER MY PLANTS. IT WATERED MY LAPTOP."
//      — visual gag is small and the betrayal is cheap slapstick; the
//      wedding version has higher stakes and a clearer story in one glance.
// The chosen caption wins on brevity (top line fits at full meme type
// size), a single unmistakable prop, and stakes the viewer feels instantly.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const MAX_DIM = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "assets", "meme.png");
const OUT_DIR = "/output";
const OUT = join(OUT_DIR, "entry.png");

function fail(message: string): never {
  throw new Error(`entry.png validation FAILED: ${message}`);
}

// Read the shipped meme and check it is a whole PNG.
if (!existsSync(SRC)) fail(`source image missing: ${SRC}`);
const bytes = readFileSync(SRC);
if (bytes.length < 33) fail(`source too short to be a PNG (${bytes.length} bytes)`);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) fail("source is not a PNG (bad magic)");
if (bytes.toString("ascii", 12, 16) !== "IHDR") fail("source has no PNG IHDR chunk");
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
// Whole-file check: a truncated PNG has no IEND trailer. Scan the last
// 12 bytes for the IEND chunk (length 0, type "IEND", CRC).
const tail = bytes.subarray(bytes.length - 12);
if (tail.readUInt32BE(0) !== 0 || tail.toString("ascii", 4, 8) !== "IEND") {
  fail("source PNG is truncated (no IEND trailer)");
}
if (width === 0 || height === 0) fail(`bad PNG dimensions ${width}x${height}`);
if (width > MAX_DIM || height > MAX_DIM) {
  fail(`dimensions ${width}x${height} exceed ${MAX_DIM}x${MAX_DIM}`);
}
if (bytes.length > MAX_BYTES) {
  fail(`size ${bytes.length} bytes exceeds ${MAX_BYTES}`);
}

// Ship it.
mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SRC, OUT);

// Re-read the output and confirm it is byte-identical to the source.
const out = readFileSync(OUT);
if (!out.equals(bytes)) fail("output differs from source image");
const size = statSync(OUT).size;
console.log(`entry.png written: ${size} bytes, ${width}x${height}, PNG OK`);
