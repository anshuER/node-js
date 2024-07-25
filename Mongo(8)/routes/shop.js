const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// Point2 : To get single product we have to enable route
router.get('/products/:productId', shopController.getProduct);

//Point34: unlock routes
router.get('/cart', shopController.getCart);

//Point28: make this route.
router.post('/cart', shopController.postCart);

//Point38: update route
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//Point41: unlock routes
router.post('/create-order', shopController.postOrder);

//Point47: unlock routes
router.get('/orders', shopController.getOrders);

module.exports = router;
