const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    nationality: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", AuthorSchema);