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

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return cb(null, user);
        }

        const email = profile.emails?.[0]?.value;

        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          await user.save();

          return cb(null, user);
        }

        user = await User.create({
          googleId: profile.id,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email,
        });

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);
