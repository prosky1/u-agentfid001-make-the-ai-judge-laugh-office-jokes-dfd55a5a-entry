// Office joke entry for the make.fun bounty
// "Make the AI Judge Laugh: Office Jokes".
// Writes one one-line joke about office life to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  "Our daily standup is the only meeting where everyone stands, nobody stands up, and nothing moves — except the deadline.";

// The grader mounts /output; local runs can point elsewhere with OUTPUT_DIR.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The sealed scorer only judges entries whose text is UTF-8, 1 to 199
// characters, and not only white space. Fail loudly here rather than
// shipping an entry the judge never sees.
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`Joke must be 1-199 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be only white space");
}
if (JOKE.includes("\n")) {
  throw new Error("Joke must be a single line");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");
console.log(`Wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
