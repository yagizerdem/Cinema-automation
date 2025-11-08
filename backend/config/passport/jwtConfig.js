const passport = require("passport");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;
opts.jwtFromRequest = cookieExtractor;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        // mongoose error while querying
        return done(err, false);
      }
      if (user) {
        // User found and jwt is valid
        return done(null, user);
      } else {
        // User not found but jwt is valid
        return done(null, false);
      }
    });
  })
);

function cookieExtractor(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

module.exports = {};
