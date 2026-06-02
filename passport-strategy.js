const passport = require("passport");
const { User } = require("./model/user");

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const { email, firstName, lastName } = jwt_payload;
    if (!jwt_payload) {
      return done(null, false);
    }

    const userFromDb = await User.findOne({ email }).select("-password, -__v");

    if (!userFromDb) {
      return done(null, false);
    }

    return done(null, {
      ...userFromDb.toObject(),
    });
  }),
);
