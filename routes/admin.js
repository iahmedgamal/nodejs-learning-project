const express = require("express");

const router = express.Router();
const adminController = require('../controllers/admin')

// /Admin/add-product => Get
router.get("/add-product", adminController.getAddProduct);

// /Admin/add-product => Post
router.post("/add-product", adminController.postAddProduct);

// admin/products => Get Admin products
router.get("/products", adminController.getAdminProducts);

// admin/edit-product/:productId => Get Edit product / productId
router.get('/edit-product/:productId',adminController.getEditProduct)

// admin/edit-product => Get Edit product
router.post('/edit-product',adminController.postEditProduct)

// admin/delete-product 
router.post('/delete-product',adminController.postDeleteProduct)
module.exports = router
