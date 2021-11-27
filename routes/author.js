const router = require("express").Router();
const Author = require("../models/Author");

router.post("/", async (req, res) => {
  const newAuthor = new Author(req.body);
  try {
    const savedAuthor = await newAuthor.save();
    res.status(200).json(savedAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const author = await Author.find();
      res.status(200).json(author);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
