const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//Point10: made this routes
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

//Point13: made this routes
router.get('/products/:productId', shopController.getProduct);

//Point28: made this routes
router.get('/cart', shopController.getCart);

//Point26: made this routes
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//Point34: made this routes
router.post('/create-order', shopController.postOrder);

//Point39: made this routes
router.get('/orders', shopController.getOrders);

module.exports = router;
