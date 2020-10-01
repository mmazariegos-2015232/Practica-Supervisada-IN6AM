"use strict";

var express         = require("express");
var magazineController  = require("../controllers/magazine.controller");
var md_auth         = require("../middlewares/authenticated");

var api = express.Router();
api.post("/magazines",       md_auth.ensureAuth, magazineController.createMagazine);
api.get("/magazines/:id",    md_auth.ensureAuth, magazineController.getMagazine);
api.put("/magazines/:id",    md_auth.ensureAuth, magazineController.updateMagazine);
api.delete("/magazines/:id", md_auth.ensureAuth, magazineController.deleteMagazine);
api.get("/magazines",        md_auth.ensureAuth, magazineController.listMagazines);

module.exports = api;