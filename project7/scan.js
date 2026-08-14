// Project 3's spine, made observable. Three additions over the original:
//
//   1. every beat appends one line to run.log — success OR failure
//   2. every beat records a rough token count, so cost is measurable
//   3. a failure writes a "needs a human" note into progress.md
//
// The point: when this fails at 3am, run.log and progress.md are the only
// evidence you get. Nobody is replaying the run.
//
//   node scan.js              normal beat
//   node scan.js --dry        print, write nothing
//   node scan.js --sabotage   point at a directory that does not exist
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PROGRESS = path.join(ROOT, 'progress.md');
const RUNLOG = path.join(ROOT, 'run.log');
const DRY = process.argv.includes('--dry');
const SABOTAGE = process.argv.includes('--sabotage');

// Sabotage mode points the scan at a path that was never created.
const SRC = SABOTAGE ? path.join(ROOT, 'src-does-not-exist') : path.join(ROOT, 'src');

const MARKER = /\b(TODO|FIXME|HACK)\b/;
const stamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

// Rough token accounting. ~4 chars per token is the usual English estimate;
// it is an estimate on purpose, because the point is the order of magnitude.
const tokens = (s) => Math.ceil(s.length / 4);

function log(line) {
  fs.appendFileSync(RUNLOG, `${stamp()} ${line}\n`);
}

// --- gather -----------------------------------------------------------------

function listJsFiles(dir) {
  // No existsSync guard here on purpose: a missing directory must throw, not
  // return an empty list. A silent empty scan is the failure this project is
  // about — it would look like a clean run that simply found nothing.
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
  let charsRead = 0;
  for (const file of listJsFiles(SRC)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const text = fs.readFileSync(file, 'utf8');
    charsRead += text.length;
    text.split(/\r?\n/).forEach((line, i) => {
      if (MARKER.test(line)) {
        found.push({ key: `${rel}:${i + 1}`, text: line.trim().replace(/^\/\/\s*/, '') });
      }
    });
  }
  return { found, charsRead };
}

// --- memory ----------------------------------------------------------------

function readRecordedKeys() {
  if (!fs.existsSync(PROGRESS)) return { keys: new Set(), charsRead: 0 };
  const text = fs.readFileSync(PROGRESS, 'utf8');
  const keys = (text.match(/`[^`\s]+\.js:\d+`/g) || []).map((k) => k.replace(/`/g, ''));
  return { keys: new Set(keys), charsRead: text.length };
}

function runNumber() {
  if (!fs.existsSync(PROGRESS)) return 1;
  return (fs.readFileSync(PROGRESS, 'utf8').match(/^## Beat \d+/gm) || []).length + 1;
}

// --- the "needs a human" note ----------------------------------------------

function recordFailure(beat, err, readTokens) {
  const block = [
    ``,
    `## Beat ${beat} - ${stamp()}`,
    ``,
    `**FAILED.** Needs a human.`,
    ``,
    `- error: \`${err.code || err.name}\` - ${err.message}`,
    `- scanning: \`${path.relative(ROOT, SRC).replace(/\\/g, '/')}\``,
    `- tokens read before failing: ~${readTokens}`,
    `- nothing was recorded this beat; the marker list is unchanged`,
    ``,
  ].join('\n');

  if (!DRY) fs.appendFileSync(PROGRESS, block);
  log(`beat ${beat} FAILED ${err.code || err.name}: ${err.message} | in=~${readTokens} out=~${tokens(block)}`);
  process.stderr.write(`beat ${beat} FAILED: ${err.message}\n  -> wrote a "needs a human" note to progress.md\n`);
}

// --- main -------------------------------------------------------------------

function main() {
  const beat = runNumber();
  const memory = readRecordedKeys();
  let readTokens = tokens(fs.readFileSync(__filename, 'utf8')) + tokens(memory.charsRead ? ' '.repeat(memory.charsRead) : '');

  let scan;
  try {
    scan = scanTodos();
  } catch (err) {
    // The loop failed. Leave evidence, then exit non-zero so a caller can gate.
    recordFailure(beat, err, readTokens);
    process.exitCode = 1;
    return;
  }

  readTokens += tokens(' '.repeat(scan.charsRead));

  const fresh = scan.found.filter((t) => !memory.keys.has(t.key));
  const gone = [...memory.keys].filter((k) => !scan.found.some((t) => t.key === k));

  const lines = [
    ``,
    `## Beat ${beat} - ${stamp()}`,
    ``,
    `Scanned ${listJsFiles(SRC).length} file(s). ${scan.found.length} marker(s) present, ` +
      `${memory.keys.size} already on record.`,
    ``,
  ];
  if (!fresh.length && !gone.length) lines.push(`**No change since the last beat.**`, ``);
  if (fresh.length) {
    lines.push(`**New (${fresh.length}):**`, ``);
    fresh.forEach((t) => lines.push(`- \`${t.key}\` - ${t.text}`));
    lines.push(``);
  }
  if (gone.length) {
    lines.push(`**Resolved or moved (${gone.length}):**`, ``);
    gone.forEach((k) => lines.push(`- \`${k}\` - no longer present`));
    lines.push(``);
  }
  lines.push(`_tokens: in ~${readTokens}, out ~${tokens(lines.join('\n'))}_`, ``);

  const block = lines.join('\n');
  const outTokens = tokens(block);

  if (DRY) {
    process.stdout.write(`[dry - nothing written]\n${block}`);
    return;
  }

  if (!fs.existsSync(PROGRESS)) {
    fs.writeFileSync(PROGRESS, `# Progress log\n\nOne section per beat. Append-only.\n`);
  }
  fs.appendFileSync(PROGRESS, block);
  log(`beat ${beat} OK ${fresh.length} new, ${gone.length} resolved | in=~${readTokens} out=~${outTokens}`);
  process.stdout.write(
    `beat ${beat}: ${fresh.length} new, ${gone.length} resolved | tokens in ~${readTokens}, out ~${outTokens}\n`
  );
}

main();
