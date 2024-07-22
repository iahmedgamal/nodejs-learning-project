const fs = require("fs");
const rootDir = require("../util/path");
const path = require("path");

const myPath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(myPath, (error, fileContent) => {
      console.log(fileContent);
      let products = [];
      if (!error) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      fs.writeFile(myPath, JSON.stringify(products), (error, done) => {});
    });
  }

  static fetchAll(cb) {
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
