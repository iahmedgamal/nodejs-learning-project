const fs = require('fs');
const path = require('path');
const rootDir = require("../util/path");

const p = path.join(
    rootDir,
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            console.log(cart);

            const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products.push(updatedProduct);
            }

            cart.totalPrice = cart.totalPrice +  +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log("err", err);
                if (!err) {
                    console.log("done");
                }
            });
        });
    }

    static deleteProduct(id) {
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            console.log('Error reading cart file:', err);
            return;
          }
    
          let cart
          try {
            cart = JSON.parse(fileContent);
          } catch (parseError) {
            console.log('Error parsing JSON:', parseError);
            return;
          }
    
          const product = cart.products.find(prod => prod.id === id);
          if (!product) {
            return;
          }
    
          const productQty = product.qty;
          const productIndex = cart.products.findIndex(prod => prod.id === id);
          cart.products.splice(productIndex, 1);
          cart.totalPrice -= productQty * product.price;
    
          fs.writeFile(p, JSON.stringify(cart), err => {
            if (err) {
              console.log('Error updating cart:', err);
            }
          });
        });
      }
};
