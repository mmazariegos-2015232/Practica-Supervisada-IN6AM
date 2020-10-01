"use strict";

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var MagazineSchema = Schema({
  author:           String,
  title:            String,
  edition:          String,
  description:      String,
  currentFrequency: String,
  exemplars:        String,
  keywords:         [String],
  themes:           [String],
  copies:           Number,
  available:        Number
});

module.exports = mongoose.model("Magazine", MagazineSchema);