const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

// const User = require("./models/user.js");
require("./database");

// Must first load the models
require("../models/user");

const User = mongoose.model("User");

// Configure the Google strategy for use by Passport.
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "100123918393-npl6gi187jo66a5le2lnh19iq7s1h45q.apps.googleusercontent.com",
      clientSecret: "tUPhDzgJW8fLTD8-imj_k6lh",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, id_token, profile, done) => {
      // passport callback function
      // check if user already exists in our db with the given profile ID
      token = id_token;

      (req, res, next) => {
        res.status(200).json({
          access_token: accessToken,
          token: id_token,
        });

        next();
      },
        User.findOne({ googleId: profile.id })
          .then((currentUser) => {
            if (currentUser) {
              // if we already have a record with the given profile ID
              done(null, currentUser, "user is existed in database and 1");
            } else if (!currentUser) {
              // if not, create a new user
              new User({
                googleId: profile.id,
                username: profile.displayName,
                photosLink: profile.photos,
                email: profile._json.email,
                accessCode: accessToken,
                refreshCode: refreshToken,
                token: id_token,
              })
                .save()
                .then((newUser) => {
                  done(null, newUser, "user is new in database and 2");
                });
            }
          })
          .catch((err) => {
            done(err, false, "there is err in authentication from google");
          });
    }
  )
);

// Configure Passport authenticated session persistence.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
