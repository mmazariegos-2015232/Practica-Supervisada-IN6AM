"use strict";

var Book = require("../models/book.model");

const createBook = async (req, res) => {
  var params  = req.body;
  var book    = new Book();
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  if (isMissingParam(params)) {
    return res.status(403).send({ message: "Missing params" });
  }
  book.author      = params.author,
  book.title       = params.title,
  book.edition     = params.edition,
  book.keywords    = params.keywords,
  book.description = params.description,
  book.themes      = params.themes,
  book.copies      = params.copies,
  book.available   = params.available
  try {
    var bookFound = await Book.find({ title: book.title }).exec();
    if (bookFound.length > 0) {
      return res.status(404).send({ message: "Book already exists" });
    }
    var createdBook = await book.save();
    if (!createdBook) {
      return res.status(404).send({ message: "Error saving book" })
    }
    return res.status(200).send({ message: "Book saved successfully", book: createdBook });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const getBook = async (req, res) => {
  try {
    var foundBook = await Book.findById(req.params.id).exec();
    if (!foundBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ book: foundBook });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const updateBook = async (req, res) => {
  var params = req.body;
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  try {
    var updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      author:       params.author,
      title:        params.title,
      edition:      params.edition,
      keywords:     params.keywords,
      description:  params.description,
      themes:       params.themes,
      copies:       params.copies,
      available:    params.available
    },
      { new: true },
    ).exec();
    if (!updatedBook) {
      return res.status(404).send({ message: "Error updated book" })
    }
    return res.status(200).send({ message: "Book updated successfully", book: updatedBook })
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const deleteBook = async (req, res) => {
  if (req.user.role != "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  try {
    var deletedBook = await Book.findByIdAndRemove(req.params.id).exec();
    if (!deletedBook) {
      return res.status(404).send({ message: "Error updating book" });
    }
    return res.status(200).send({ message: "Book deleted successful" });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const listBooks = async (req, res) => {
  try {
    var foundBooks = await Book.find().exec();
    if (!foundBooks || foundBooks.length == 0) {
      return res.status(404).send({ message: "Books not found" });
    }
    return res.status(200).send({ books: foundBooks });
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
}

const isMissingParam = (params) =>
  !params.author      ||
  !params.title       ||
  !params.edition     ||
  !params.keywords    ||
  !params.description ||
  !params.themes      ||
  !params.copies      ||
  !params.available;

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  listBooks
}

