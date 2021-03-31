require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

require("./config/passport")(passport);
const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log("Server started...");
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));
});
