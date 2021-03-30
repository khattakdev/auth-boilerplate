const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => res.render("register", { errors: [] }));
router.get("/login", (req, res) => res.render("login", { errors: [] }));

module.exports = router;
