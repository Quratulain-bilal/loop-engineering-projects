// The spine: read progress.md -> scan the repo -> record only what is new.
//
// progress.md IS the memory. Every run starts by reading what past runs already
// recorded, so run 2 reports only the delta instead of repeating run 1.
//
//   node scan.js              -> normal run, appends to progress.md
//   node scan.js --dry        -> print what it would record, write nothing
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const PROGRESS = path.join(ROOT, 'progress.md');
const DRY = process.argv.includes('--dry');

const MARKER = /\b(TODO|FIXME|HACK)\b/;

// --- gather -----------------------------------------------------------------

function listJsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? listJsFiles(path.join(dir, e.name))
        : e.name.endsWith('.js')
          ? [path.join(dir, e.name)]
          : []
    );
}

function scanTodos() {
  const found = [];
  for (const file of listJsFiles(SRC)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .forEach((line, i) => {
        if (MARKER.test(line)) {
          found.push({
            key: `${rel}:${i + 1}`,
            text: line.trim().replace(/^\/\/\s*/, ''),
          });
        }
      });
  }
  return found;
}

// --- memory ----------------------------------------------------------------

// Pull every `file.js:LINE` key this file has already recorded. Reading the
// keys back out of the log is what makes the log a memory and not just output.
function readRecordedKeys() {
  if (!fs.existsSync(PROGRESS)) return new Set();
  const text = fs.readFileSync(PROGRESS, 'utf8');
  const keys = text.match(/`[^`\s]+\.js:\d+`/g) || [];
  return new Set(keys.map((k) => k.replace(/`/g, '')));
}

function runNumber() {
  if (!fs.existsSync(PROGRESS)) return 1;
  const runs = fs.readFileSync(PROGRESS, 'utf8').match(/^## Run \d+/gm) || [];
  return runs.length + 1;
}

// --- report ----------------------------------------------------------------

function main() {
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  const recorded = readRecordedKeys();
  const current = scanTodos();

  const fresh = current.filter((t) => !recorded.has(t.key));
  const gone = [...recorded].filter((k) => !current.some((t) => t.key === k));
  const run = runNumber();

  const lines = [
    ``,
    `## Run ${run} - ${stamp}`,
    ``,
    `Scanned ${listJsFiles(SRC).length} file(s) under src/. ` +
      `${current.length} marker(s) present, ${recorded.size} already on record.`,
    ``,
  ];

  if (fresh.length === 0 && gone.length === 0) {
    lines.push(`**No change since the last run.** Nothing new to record.`, ``);
  }
  if (fresh.length > 0) {
    lines.push(`**New since last run (${fresh.length}):**`, ``);
    fresh.forEach((t) => lines.push(`- \`${t.key}\` - ${t.text}`));
    lines.push(``);
  }
  if (gone.length > 0) {
    lines.push(`**Resolved or moved since last run (${gone.length}):**`, ``);
    gone.forEach((k) => lines.push(`- \`${k}\` - no longer present`));
    lines.push(``);
  }

  const block = lines.join('\n');

  if (DRY) {
    process.stdout.write(`[dry run - nothing written]\n${block}`);
    return;
  }

  if (!fs.existsSync(PROGRESS)) {
    fs.writeFileSync(
      PROGRESS,
      `# Progress log\n\nAppend-only. Each run records only what changed since the run before it.\n`
    );
  }
  fs.appendFileSync(PROGRESS, block);
  process.stdout.write(
    `Run ${run} recorded: ${fresh.length} new, ${gone.length} resolved. -> progress.md\n`
  );
}

main();

