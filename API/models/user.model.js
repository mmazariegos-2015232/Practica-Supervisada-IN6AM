'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserSchema = Schema({
  studentCode_CUI:  String,
  name:             String,
  lastname:         String,
  email:            String,
  username:         String,
  role: {
    type:           String,
    enum:           ["admin", "estudiante", "catedrático"],
  },
  password:         String,
  books: [{
    type:           Schema.ObjectId,
    ref:            "Book",
  }],
  magazines: [{
    type:           Schema.ObjectId,
    ref:            "Magazine",
  }]
});

module.exports = mongoose.model("User", UserSchema);
