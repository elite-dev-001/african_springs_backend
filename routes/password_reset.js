const express = require('express')
const resetController = require('../controllers/password_reset');

const router = express.Router();

router.post('/password/:id', resetController.resetPassword);

module.exports = router;