const path = require('path');
const express = require('express');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

// Ye sirf saara daata bhejega
router.post('/signUp', expenseController.addUser);

//  Ye saara data dekhega + Rakhega + Check Karega
router.post('/signIn', expenseController.signInUser);

module.exports = router;