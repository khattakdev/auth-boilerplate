const express = require("express");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const PORT = process.env.port || 3000;
const app = express();

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, console.log("Server started..."));
