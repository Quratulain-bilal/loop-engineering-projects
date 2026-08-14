// Issue 3: paginate returns the wrong slice and mishandles the last page.
function paginate(items, page, perPage) {
  const start = page * perPage;
  return items.slice(start, start + perPage);
}

module.exports = { paginate };
