const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.productName;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const newProd = new Product(null, title,imageUrl,description,price)
  newProd.save()
  res.redirect("/");
};

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
      activeAddProduct: true,
      pageTitle: "Add product",
      editing: false
    });
  };
  
  exports.getEditProduct = (req, res, next) => {
    console.log("zew")
    const editMode = req.query.edit
    if(!editMode){
      return res.redirect('/')
    }

    const prodId = req.params.productId
    Product.fetchOneProduct(prodId, (product)=>{
      if(!product){
        return res.redirect('/')
      }
      res.render("admin/edit-product", {
        activeAddProduct: true,
        pageTitle: "Edit product",
        editing: editMode,
        product: product
      });
    })

  };

  exports.postEditProduct = (req, res, next)=>{
     const prodId = req.body.productId
     console.log("admin prodId", prodId)
     const updatedTitle = req.body.productName
     const updatedPrice = req.body.price
     const updatedImageUrl = req.body.imageUrl
     const updatedDescription = req.body.description
    const updatedProduct = new Product(prodId, updatedTitle,updatedImageUrl,updatedDescription,updatedPrice)
      console.log("admin postEditProduct", updatedProduct)
    updatedProduct.save()
    res.redirect('/admin/products')
  }

  exports.postDeleteProduct = (req, res, next)=>{
    const prodId = req.body.productId
    Product.delete(prodId)
    console.log("admin deleteProduct prodId", prodId)
    res.redirect('/admin/products')
  }

  exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products)=>{
     res.render("admin/products", {
       pageTitle: "Admin Products",
       products: products,
       activeShop: true,
     });
    })
   };