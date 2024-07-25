const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//Point8: made this two routes
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

//Point15: made this routes
router.get('/edit-product/:productId', adminController.getEditProduct);

//Point17: made this routes
router.post('/edit-product', adminController.postEditProduct);

//Point19: made this routes
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
