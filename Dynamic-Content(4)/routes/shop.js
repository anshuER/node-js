const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  const products = adminData.products;
  // after implementing pug we ca write it will automatically get pug file without extension
  // we are passsing prop as a key value pair
  res.render('shop', { prods: products, docTitle: 'Shop' });
});

module.exports = router;
