const express = require("express");

const router = express.Router();
const productsController = require('../controllers/products')

router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);

// fetch admin products
router.get("/products", productsController.getAdminProducts);


module.exports = router
