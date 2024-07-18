const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const router = express.Router();
const products = [];
router.get("/add-product", (req, res, next) => {
  res.render('add-product', {activeAddProduct:true, pageTitle:'Add product'});
});

router.post("/products", (req, res, next) => {
  console.log(req.body);
  products.push({title: req.body.productName})
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
