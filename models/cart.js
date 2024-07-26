const fs = require('fs')
const path = require('path')
const rootDir = require("../util/path");

const p = path.join(
    rootDir,
    'data',
    'cart.json'
    )
module.exports = class Cart{
    static addProduct(id, productPrice){
        // fetch the previous cart
        fs.readFile(p, (err, fileContent)=>{
            let cart = {products:[], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            console.log(cart)
            const exisitingProductIndex = cart.products.findIndex(prod=> prod.id == id)
            const exisitingProduct= cart.products[exisitingProductIndex]
            let updatedProduct;
            if(exisitingProduct){
                updatedProduct = {...exisitingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[exisitingProductIndex] = updatedProduct
            }else{
                updatedProduct = {id: id, qty: 1}
            }
            cart.totalPrice = cart.totalPrice + productPrice
            cart.products = [...cart.products, updatedProduct]
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log("err", err)
                if(!err){
                    console.log("done")
                }
            })
        })
        // analize the cart => find the exisiting product 
    }
 
}