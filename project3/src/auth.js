// Login helpers.

function login(user, password) {
  // TODO: validate token expiry before trusting the session
  return { user, token: 'stub-token' };
}

function logout(token) {
  // FIXME: this leaks the session on the server side
  return true;
}

module.exports = { login, logout };
