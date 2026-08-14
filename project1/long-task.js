// A deliberately slow job, so there is something real for the loop to wait on.
// Writes progress as it goes, then a DONE marker the watcher polls for.
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'output');
const PROGRESS = path.join(OUT_DIR, 'progress.log');
const DONE = path.join(OUT_DIR, 'result.json');

const TOTAL_STEPS = Number(process.argv[2] || 5);
const STEP_MS = Number(process.argv[3] || 60_000);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stamp = () => new Date().toISOString();

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Fresh run: clear the marker so a stale DONE can't fool the watcher.
  fs.rmSync(DONE, { force: true });
  fs.writeFileSync(PROGRESS, `${stamp()} started, ${TOTAL_STEPS} steps\n`);

  for (let step = 1; step <= TOTAL_STEPS; step++) {
    await sleep(STEP_MS);
    fs.appendFileSync(PROGRESS, `${stamp()} step ${step}/${TOTAL_STEPS} done\n`);
  }

  fs.writeFileSync(
    DONE,
    JSON.stringify({ status: 'done', steps: TOTAL_STEPS, finishedAt: stamp() }, null, 2)
  );
  fs.appendFileSync(PROGRESS, `${stamp()} FINISHED\n`);
}

main();
