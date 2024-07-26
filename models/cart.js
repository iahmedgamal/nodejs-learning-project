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

            cart.totalPrice = cart.totalPrice + productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log("err", err);
                if (!err) {
                    console.log("done");
                }
            });
        });
    }
};
