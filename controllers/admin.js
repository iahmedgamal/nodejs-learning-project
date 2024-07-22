const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const newProd = new Product(req.body.productName)
  newProd.save()
  res.redirect("/");
};

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
      activeAddProduct: true,
      pageTitle: "Add product",
    });
  };
  
  exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products)=>{
     res.render("admin/products", {
       pageTitle: "Admin Products",
       products: products,
       activeShop: true,
     });
    })
   };