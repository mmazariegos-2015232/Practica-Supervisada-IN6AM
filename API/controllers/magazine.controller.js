"use strict";

var Magazine = require("../models/magazine.model");

const createMagazine = async (req, res) => {
  var params  = req.body;
  var magazine    = new Magazine();
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  if (isMissingParam(params)) {
    return res.status(403).send({ message: "Missing params" });
  }
  magazine.author           = params.author,
  magazine.title            = params.title,
  magazine.edition          = params.edition,
  magazine.description      = params.description,
  magazine.currentFrequency = params.currentFrequency,
  magazine.exemplars        = params.exemplars,
  magazine.themes           = params.themes,
  magazine.keywords         = params.keywords
  magazine.copies           = params.copies
  magazine.available        = params.available
  try {
    var magazineFound = await Magazine.find({ title: magazine.title }).exec();
    if (magazineFound.length > 0) {
      return res.status(404).send({ message: "Magazine already exists" });
    }
    var createdMagazine = await magazine.save();
    if (!createdMagazine) {
      return res.status(404).send({ message: "Error saving magazine" })
    }
    return res.status(200).send({ message: "Magazine saved successfully", magazine: createdMagazine });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const getMagazine = async (req, res) => {
  try {
    var foundMagazine = await Magazine.findById(req.params.id).exec();
    if (!foundMagazine) {
      return res.status(404).send({ message: "Magazine not found" });
    }
    return res.status(200).send({ magazine: foundMagazine });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const updateMagazine = async (req, res) => {
  var params = req.body;
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  try {
    var updatedMagazine = await Magazine.findByIdAndUpdate(req.params.id, {
      author:            params.author,
      title:             params.title,
      edition:           params.edition,
      description:       params.description,
      currentFrequency:  params.currentFrequency,
      exemplars:         params.exemplars,
      themes:            params.themes,
      keywords:          params.keywords,
      copies:            params.copies,
      available:         params.available
    },
      { new: true },
    ).exec();
    if (!updatedMagazine) {
      return res.status(404).send({ message: "Error updated magazine" })
    }
    return res.status(200).send({ message: "Magazine updated successfully", magazine: updatedMagazine })
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const deleteMagazine = async (req, res) => {
  var params = req.body;
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  try {
    var deletedMagazine = await Magazine.findByIdAndRemove(req.params.id).exec();
    if (!deletedMagazine) {
      return res.status(404).send({ message: "Error updating magazine" });
    }
    return res.status(200).send({ message: "Magazine deleted successful" });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const listMagazines = async (req, res) =>{
  try {
    var foundMagazine = await Magazine.find().exec();
    if (!foundMagazine || foundMagazine.length == 0) {
      return res.status(404).send({ message: "Magazine not found" });
    }
    return res.status(200).send({ magazines: foundMagazine });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const isMissingParam = (params) =>
  !params.author            ||
  !params.title             ||
  !params.edition           ||
  !params.description       ||
  !params.currentFrequency  ||
  !params.exemplars         ||
  !params.themes            ||
  !params.keywords          ||
  !params.copies            ||
  !params.available;

module.exports = {
  createMagazine,
  getMagazine,
  updateMagazine,
  deleteMagazine,
  listMagazines
}

