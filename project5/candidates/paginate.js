// Candidate fix for issue "paginate".
// Pages are 1-based, so offset by (page - 1). Reject page < 1. slice() already
// returns a new array and clamps past the end, so the input is never touched.
function paginate(items, page, perPage) {
  if (!Number.isInteger(page) || page < 1) {
    throw new RangeError(`page must be an integer >= 1, got ${page}`);
  }
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

module.exports = { paginate };
