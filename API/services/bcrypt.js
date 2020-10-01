"use strict";

var bcrypt = require("bcrypt");

/**
 * Functions that hash string and return it
 * @param {string} field      String to be hashed
 * @returns {Promise<String>} A promise to be either resolved with de hash result or reject with an error
 */
const hashField = async (field) => await bcrypt.hash(field, 12);

/**
 * Validate if plain string is same that hashed string
 * @param {string} field       String to be compared with hashed string
 * @param {string} hashedField String hashed needed to compare
 * @returns {Promise<boolean>} A promise to be either resolved with de comparison result or reject with an error
 */
const compareWithHashed = async (field, hashedField) => await bcrypt.compare(field, hashedField);

module.exports = {
  hashField,
  compareWithHashed,
};
