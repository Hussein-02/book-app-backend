const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    //.save(): to save in database
    await newBook.save();
    res.status(200).send({ message: "Book posted successfully!", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create a Book!" });
  }
};

//get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch the Books!" });
  }
};

//get a single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch Book!" });
  }
};

//update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send({ message: "Failed to update Book!" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully!", book: deletedBook });
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send({ message: "Failed to delete Book!" });
  }
};

//for search bar
const searchBook = async (req, res) => {
  try {
    const { searchBy } = req.query;

    if (!searchBy) {
      return res.status(400).send({ message: "Please provide a search term." });
    }

    const books = await Book.find({
      title: { $regex: searchBy, $options: "i" }, // 'i' makes it case-insensitive
      // description: { $regex: searchBy, $options: "i" }, // 'i' makes it case-insensitive
    });

    if (books.length === 0) {
      return res.status(404).send({ message: "No books found matching the search term" });
    }

    res.status(200).send(books);
  } catch (error) {
    console.error("Error searching for books", error);
    res.status(500).send({ message: "Failed to find Books!" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  searchBook,
};
