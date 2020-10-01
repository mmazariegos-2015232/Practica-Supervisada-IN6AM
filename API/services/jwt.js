"use strict";

var jwt     = require("jwt-simple");
var moment  = require("moment");
var secret  = '56$pmT"~49T&%#K2_SECRET';

exports.createToken = (user) => {
  var payload = {
    sub:              user._id,
    studentCode_CUI:  user.studentCode_CUI,
    name:             user.name,
    lastname:         user.lastname,
    email:            user.email,
    username:         user.username,
    role:             user.role,
    iat:              moment().unix(),
    exp:              moment().day(30, 'days').unix
  }
  return jwt.encode(payload, secret);
}