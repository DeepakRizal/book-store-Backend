import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookControllers.js";

const router = express.Router();

//Route  to save a new book
router.post("/", createBook);

// Route to get all books from database
router.get("/", getAllBooks);

//Get one book by id
router.get("/:id", getBook);

//Route for update a book
router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
