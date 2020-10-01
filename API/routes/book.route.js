"use strict";

var express         = require("express");
var bookController  = require("../controllers/book.controller");
var md_auth         = require("../middlewares/authenticated");

var api = express.Router();
api.post("/books",       md_auth.ensureAuth, bookController.createBook);
api.get("/books/:id",    md_auth.ensureAuth, bookController.getBook);
api.put("/books/:id",    md_auth.ensureAuth, bookController.updateBook);
api.delete("/books/:id", md_auth.ensureAuth, bookController.deleteBook);
api.get("/books",        md_auth.ensureAuth, bookController.listBooks);

module.exports = api;