const fs = require("fs");
const rootDir = require("../util/path");
const path = require("path");

const myPath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = this.id || Math.random().toString();
    fs.readFile(myPath, (error, fileContent) => {
      let products = JSON.parse(fileContent);
      if(this.id){
        const findMyExisitingProd = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[findMyExisitingProd] = this
        fs.writeFile(myPath, JSON.stringify(updatedProducts), (error, done) => {});

      }else{

        if (!error) {
          products = JSON.parse(fileContent);
        }
  
        products.push(this);
        fs.writeFile(myPath, JSON.stringify(products), (error, done) => {});
      }
    
    
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

  static fetchOneProduct(productId,cb){
    fs.readFile(myPath, (error, fileContent) => {
      if (error) {
        return cb([]);
      }
      const productResult = JSON.parse(fileContent)
     
      cb( productResult.find((a)=>{
        return a.id == productId
      }));
    });
  }
};
