const express = require("express");
const path = require('path');

const adminData = require('./admin');
const rootDir = require('../util/path');
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("shop.js route hit", adminData.products);
    const products = adminData.products;
    res.render('shop', { pageTitle: 'shop', products: products, activeShop:true});
});

module.exports = router;
