const express = require('express');
const router = express.Router();
const {transactionController,houseAccountTransferController,mixerController} = require('../controller/transactionController');

router.post('/transaction',transactionController);
router.post('/transfer',houseAccountTransferController);
router.put('/mix',mixerController);
module.exports = router;