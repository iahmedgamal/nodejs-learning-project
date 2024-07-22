const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.productName;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const newProd = new Product(title,imageUrl,description,price)
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