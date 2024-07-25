// Point1: added styling for navbar and now making this auth page
const express = require('express');

// Point5: import egtLogin
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
// Point7: add route for postLogin
router.post('/login', authController.postLogin);
// Point21: add route for postLogin

router.post('/logout', authController.postLogout);

module.exports = router;
