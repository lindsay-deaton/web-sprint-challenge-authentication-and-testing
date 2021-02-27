const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
//2- On missing token in the Authorization header, the response body should include a string exactly as follows: "token required".
    res.status(401).json("token required")
  } else {
    jwt.verify(token, "shh", (err, decoded) => {
      if (err) {
//3- On invalid or expired token in the Authorization header, the response body should include a string exactly as follows: "token invalid".
        res.status(401).json("token invalid")
      } else {
//1- On valid token in the Authorization header, call next.
        req.decodedToken = decoded
        next();
    }
  })
  }
};
