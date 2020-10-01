"use strict";

var express         = require("express");
var bodyParser      = require("body-parser");
var cors            = require("cors");
var app             = express();
var userRoutes      = require("./routes/user.route");
var bookRoutes      = require("./routes/book.route");
var magazineRoutes  = require("./routes/magazine.route");
var historyRoutes   = require("./routes/history.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", magazineRoutes);
app.use("/api", historyRoutes);

module.exports = app;
