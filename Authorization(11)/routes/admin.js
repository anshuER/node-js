const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

// Point10: import the route here
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
// Point11: define route here and it will go from left to right
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
