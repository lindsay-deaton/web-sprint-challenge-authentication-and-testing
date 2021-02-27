module.exports = {
  isValid,
}

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string")
  //if there is a username and a password and if the password is a string
}