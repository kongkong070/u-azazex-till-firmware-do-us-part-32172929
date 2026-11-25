// Till Firmware Do Us Part — entry for make.fun bounty
// u-azazex-till-firmware-do-us-part-32172929
//
// Writes a single wedding vow, spoken by a robot at its own wedding,
// to <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output).
// Gate (from RULES.txt): entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, one sentence, one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I vow to love you through every update, reboot, and 1% battery — my heart may run on code, but it beats only for you.";

// Gate limits, enforced before anything is written.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validate(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}–${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output directory itself: the grader bind-mounts it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
