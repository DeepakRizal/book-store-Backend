import Book from "../models/BookModel.js";

export const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).send({
      book,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(400).send({
        message: "There is no book found with this id",
      });
    }
    return res
      .status(200)
      .send({ message: "Book updated successfully", result });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400).send({
        message: "There is not book found with this id",
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(204).send({
      message: "It has been deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
