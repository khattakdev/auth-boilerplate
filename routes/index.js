const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/home", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  res.render("home", { user: req.user });
});

module.exports = router;
