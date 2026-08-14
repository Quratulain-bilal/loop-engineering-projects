// Issue 1: daysBetween is off by one and breaks across a DST boundary.
function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

module.exports = { daysBetween };
