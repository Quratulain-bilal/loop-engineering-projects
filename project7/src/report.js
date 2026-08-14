// Report building.

function buildReport(rows) {
  return rows.map((r) => r.join(','));
}

module.exports = { buildReport };
