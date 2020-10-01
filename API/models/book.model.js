"use strict";

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BookSchema = Schema({
  author:       String,
  title:        String,
  edition:      String,
  description:  String,
  keywords:     [String],
  themes:       [String],
  copies:       Number,
  available:    Number
});

module.exports = mongoose.model("Book", BookSchema);