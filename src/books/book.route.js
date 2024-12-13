const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  searchBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

//post a book
router.post("/create-book", verifyAdminToken, postABook);

//search book by word
router.get("/search", searchBook);

//get all books
router.get("/", getAllBooks);

//get single book
router.get("/:id", getSingleBook);

//update book
router.put("/edit/:id", verifyAdminToken, updateBook);

//delete book
router.delete("/delete/:id", verifyAdminToken, deleteBook);

module.exports = router;
