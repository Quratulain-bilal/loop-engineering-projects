# Progress log

Append-only. Each run records only what changed since the run before it.

## Run 1 - 2026-08-14 12:56:59 UTC

Scanned 2 file(s) under src/. 3 marker(s) present, 0 already on record.

**New since last run (3):**

- `src/auth.js:4` - TODO: validate token expiry before trusting the session
- `src/auth.js:9` - FIXME: this leaks the session on the server side
- `src/report.js:4` - TODO: paginate once we cross 1000 rows

## Run 2 - 2026-08-14 12:57:19 UTC

Scanned 2 file(s) under src/. 3 marker(s) present, 3 already on record.

**No change since the last run.** Nothing new to record.

## Run 3 - 2026-08-14 12:58:04 UTC

Scanned 3 file(s) under src/. 3 marker(s) present, 3 already on record.
=a
**New since last run (1):**

- `src/cache.js:6` - TODO: honour a TTL so entries expire

**Resolved or moved since last run (1):**

- `src/report.js:4` - no longer present

## Run 4 - 2026-08-14 13:49:37 UTC

Scanned 3 file(s) under src/. 3 marker(s) present, 4 already on record.

**Resolved or moved since last run (1):**

- `src/report.js:4` - no longer present
