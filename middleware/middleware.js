const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

function authenticateToken(req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      status: "error",
      code: "AUTHENTICATION_ERROR",
      message: "Access denied. Token not provided.",
    });
  }
  token = token.split(" ");
  token = token[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        code: "INVALID_TOKEN",
        message: "Invalid access token provided",
      });
    }

    req.userId = decoded.userId; // Attach user ID to the request for future use
    next();
  });
}

module.exports = authenticateToken;
