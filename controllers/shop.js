const Product = require('../models/product')



exports.getProducts = (req, res, next) => {
 Product.fetchAll((products)=>{
  res.render("shop/product-list", {
    pageTitle: "All Products",
    path:'/products',
    products: products,

  });
 })
};

exports.getOneProduct = (req, res, next) => {
    const productId = req.params.productId;
    console.log("productId",productId)
    Product.fetchOneProduct( (product)=>{
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path:'/products',
        product: product,
      });
    }, productId)
 };


exports.getIndex = (req, res, next) => {
  Product.fetchAll((products)=>{
   res.render("shop/index", {
     pageTitle: "shop index",
     products: products,
   });
  })
 };

 exports.getCart = (req,res,next)=>{
  res.render('shop/cart', {
    path:'/cart',
    pageTitle:"Cart"
  })
 }
 exports.postCart = (req,res,next)=>{
  const productId = req.body.productId;
  console.log("postCart", productId)
  res.redirect('/')
 }

 exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout', {
    path:'/checkout',
    pageTitle:"Checkout"
  })
 }

 exports.getOrders = (req,res,next)=>{
  res.render('shop/orders', {
    path:'/orders',
    pageTitle:"Orders"
  })
 }