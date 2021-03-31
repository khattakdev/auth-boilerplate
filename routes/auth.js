const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

const router = express.Router();

router.get("/register", (req, res) => res.render("register", { errors: [] }));

router.get("/login", (req, res) => {
  res.render("login", {
    errors: res.locals.error || [],
    success: res.locals.success[0] || "",
  });
});

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push("Some fields are empty.");
  }

  if (password.length < 6) {
    errors.push("Password must be atleast 6 chracters.");
  }

  if (password != confirmPassword) {
    errors.push("Password not matched.");
  }

  if (errors.length > 0) {
    for (const value of errors) {
      console.log(value);
    }
    res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    const userExist = await User.findOne({ email });

    if (userExist) {
      errors.push("Email already exists.");
      res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;

        const user = new User({
          name,
          email,
          password: hash,
        });

        // await user.save();
        req.flash("message", "You can now log in");
        res.redirect("/auth/login");
      });
    });
  }
});

router.post("/login", (req, res, next) => {
  console.log(req.body.user);
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
