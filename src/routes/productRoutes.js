const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", auth, getProducts);
router.get("/:id", auth, getProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
