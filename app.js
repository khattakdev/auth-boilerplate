const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const app = express();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.port || 3000;

mongoose
  .connect("", { useNewUrlParser: true })
  .then((res) => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));
app.listen(PORT, console.log("Server started..."));
