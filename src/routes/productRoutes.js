const express = require("express");
const router = express.Router();

// contoh route kosong
router.get("/", (req, res) => {
  res.json({ message: "Product route working" });
});

module.exports = router;
