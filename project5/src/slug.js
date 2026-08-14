// Issue 2: slugify leaves punctuation in and collapses nothing.
function slugify(title) {
  return title.toLowerCase().replace(' ', '-');
}

module.exports = { slugify };
