const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

// we use router.use() instead of app.use()
router.get('/', (req, res, next) => {
  // res.send('<h1>Helllo Express</h1>');
  // this type of path does not work here so we import path from node module
  // res.sendFile('./views/shop.html');
  // __dirname is a global path provided by node and it point to current file name i.e routes folder here
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
