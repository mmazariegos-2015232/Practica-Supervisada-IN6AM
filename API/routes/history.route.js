'use strict';

var express             = require("express");
var reportController    = require("../controllers/history.controller");
var md_auth             = require("../middlewares/authenticated");

var api = express.Router();
api.get("/histories", md_auth.ensureAuth, reportController.listHistories);

module.exports = api;