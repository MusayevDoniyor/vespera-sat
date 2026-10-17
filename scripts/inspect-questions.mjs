import fs from "fs";

const lines = fs.readFileSync("src/lib/bluebook-tests.ts", "utf8").split("\n");
const targets = [
  "pt1-m1-05",
  "pt1-m1-06",
  "pt2-m1-02",
  "oct-m1-02",
  "pt3-m1-02",
  "pt3-m2h-01",
  "pt4-m1-01",
  "pt4-m2h-01",
  "ee-m1-01",
  "m800-m1-01",
  "m800-m1-02",
  "m800-m2h-01",
  "m800-m2e-01",
];

lines.forEach((line, idx) => {
  targets.forEach((t) => {
    if (line.includes(`"${t}"`)) {
      console.log(`${t} found at line ${idx + 1}`);
    }
  });
});
