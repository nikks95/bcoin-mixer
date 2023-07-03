const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');
router.post('/users/adresses',userController.getDepositAddress);

module.exports = router;