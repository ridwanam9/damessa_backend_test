const express = require("express");
const router = express.Router();

// contoh route kosong
router.get("/", (req, res) => {
  res.json({ message: "Category route working" });
});

module.exports = router;
