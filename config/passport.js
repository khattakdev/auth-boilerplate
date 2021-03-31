const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");

function verification(passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "The email is not registered" });
        }

        bcrypt.compare(password, user.password, (err, isMatched) => {
          if (err) throw err;

          if (isMatched) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = verification;
