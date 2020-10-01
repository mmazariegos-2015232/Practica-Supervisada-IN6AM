'use strict';
const History = require('../models/history.model');

const createHistory = async (newHistory) => {
  var history = new History();
  history.userId            = newHistory.userId;
  history.action            = newHistory.action;
  history.bookOrMagazineId  = newHistory.bookOrMagazineId;
  history.actionDate        = newHistory.actionDate;
  history.isMagazine        = newHistory.isMagazine;
  history.isBook            = newHistory.isBook;
  return await history.save()
}

const listHistories = async (req, res) => {
  try {
    var histories = await History.find().exec();
    if (!histories) {
      return res.status(404).send({ message: "Histories not found" });
    }
    return res.status(200).send({ histories: histories, message: "Histories listed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

module.exports = {
  createHistory,
  listHistories,
}
