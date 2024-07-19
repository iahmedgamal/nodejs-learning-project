const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    activeAddProduct: true,
    pageTitle: "Add product",
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const newProd = new Product(req.body.productName)
  newProd.save()
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll()
  res.render("shop", {
    pageTitle: "shop",
    products: products,
    activeShop: true,
  });
};
