// Candidate fix for issue "dates".
// Drop the +1, and compare UTC midnights so a DST shift cannot move the result.
function daysBetween(a, b) {
  const start = Date.parse(`${a}T00:00:00Z`);
  const end = Date.parse(`${b}T00:00:00Z`);
  return Math.round((end - start) / 86400000);
}

module.exports = { daysBetween };
