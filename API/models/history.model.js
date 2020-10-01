"use strict";

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var HistorySchema = Schema({
  userId:           String,
  action:           String, /* ("SEARCH" || "RETURN" || "REQUEST") */
  bookOrMagazineId: String,
  actionDate:       Date,
  isMagazine:       Boolean,
  isBook:           Boolean
});

module.exports = mongoose.model("History", HistorySchema);
