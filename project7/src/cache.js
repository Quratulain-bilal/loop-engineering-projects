// Simple in-memory cache.

const store = new Map();

function get(key) {
  // TODO: honour a TTL so entries expire
  return store.get(key);
}

function set(key, value) {
  store.set(key, value);
}

module.exports = { get, set };
