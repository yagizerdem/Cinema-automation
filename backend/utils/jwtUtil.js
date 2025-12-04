var jwt = require("jsonwebtoken");

function signJwt({ email, userRole, emailVerified, firstName, lastName }) {
  var token = jwt.sign(
    { email, userRole, emailVerified, firstName, lastName },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 * 90 } // 3 months 120 days
  );
  return token;
}

module.exports = { signJwt };
