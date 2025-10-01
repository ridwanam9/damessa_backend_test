const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", auth, createCategory);
router.get("/", auth, getCategories);
router.get("/:id", auth, getCategory);
router.put("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCategory);

module.exports = router;
