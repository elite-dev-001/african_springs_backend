const express = require('express')
const userController = require('../controllers/user')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', userController.createUser);
router.get('/get/all', ensureToken, userController.getAllUsers)
router.get('/get/one/:id', ensureToken, userController.getOneUser);
router.patch('/update/comment/:id', userController.updateUserComments);
router.patch('/update/suspension/:id', userController.suspendAccount)
router.patch('/update/profile/:id', userController.userProfile)

module.exports = router;