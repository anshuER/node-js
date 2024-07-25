const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const router = express.Router();

// we use router.use() instead of app.use()
router.get('/add-product', (req, res, next) => {
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">submit</button></form>'
  // );

  // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
