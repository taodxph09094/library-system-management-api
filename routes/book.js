const Book = require("../models/Book");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Đã xóa...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Book
router.get("/find/:id", async (req, res) => {
  try {
    const Book = await Book.findById(req.params.id);
    res.status(200).json(Book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BookS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const publishingName = req.query.publishing;
  const authorName = req.query.author;
  try {
    let Books;

    if (qNew) {
      Books = await Book.find().sort({ createdAt: -1 }).limit(1);
      Books = await Book.find({ qNew });
    } else if (qCategory) {
      Books = await Book.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (publishingName) {
        Books = await Book.find({
          publishing: {
            $in: [publishingName],
          },
        });
      }else if (authorName) {
        Books = await Book.find({
          author: {
            $in: [authorName],
          },
        });
      }else {
      Books = await Book.find();
    }

    res.status(200).json(Books);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
