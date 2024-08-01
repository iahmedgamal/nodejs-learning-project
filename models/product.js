const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const myPath = path.join(rootDir, "data", "products.json");
const Cart = require("../models/cart");
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // Method to save a new product
  saveNew() {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        console.log('Error reading file:', error);
        return;
      }

      let products = [];
      try {
        products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
      }

      // Assign a new ID for the new product
      this.id = Math.random().toString();
      products.push(this);

      fs.writeFile(myPath, JSON.stringify(products), (writeError) => {
        if (writeError) {
          console.log('Error saving new product:', writeError);
        }
      });
    });
  }

  // Method to update an existing product
  update() {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        console.log('Error reading file:', error);
        return;
      }

      let products = [];
      try {
        products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
        return;
      }

      const findMyExistingProdIndex = products.findIndex(prod => prod.id === this.id);

      if (findMyExistingProdIndex >= 0) {
        const updatedProducts = [...products];
        updatedProducts[findMyExistingProdIndex] = this;

        fs.writeFile(myPath, JSON.stringify(updatedProducts), (writeError) => {
          if (writeError) {
            console.log('Error updating product:', writeError);
          }
        });
      } else {
        console.log('Product not found');
      }
    });
  }

  static deleteById(id) {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        console.log('Error reading file:', error);
        return;
      }

      let products = [];
      try {
        products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
        return;
      }

      const updatedProducts = products.filter(prod => prod.id !== id);

      fs.writeFile(myPath, JSON.stringify(updatedProducts), (writeError) => {
        if (writeError) {
          console.log('Error deleting product:', writeError);
        }
        Cart.deleteProduct(id);

      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        console.log('Error reading file:', error);
        return cb([]);
      }

      let products = [];
      try {
        products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
      }

      cb(products);
    });
  }

  static fetchOneProduct(productId, cb) {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        console.log('Error reading file:', error);
        return cb(null);
      }

      let products = [];
      try {
        products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
      } catch (parseError) {
        console.log('Error parsing JSON:', parseError);
        return cb(null);
      }

      const product = products.find((a) => a.id == productId);
      cb(product);
    });
  }
};
