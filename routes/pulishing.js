const router = require("express").Router();
const Publishing = require("../models/Publishing");

router.post("/", async (req, res) => {
  const newPublishing = new Publishing(req.body);
  try {
    const savedPublishing = await newPublishing.save();
    res.status(200).json(savedPublishing);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const author = await Publishing.find();
      res.status(200).json(author);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
