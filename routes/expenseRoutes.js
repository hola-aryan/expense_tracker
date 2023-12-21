const path = require('path');
const express = require('express');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/signIn', expenseController.addUser);

module.exports = router;