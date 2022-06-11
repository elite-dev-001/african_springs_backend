const express = require('express')
const adminController = require('../controllers/admin')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', adminController.createAdmin)
router.get('/get/all', ensureToken, adminController.getAllAdmins)
router.get('/get/one/:id', ensureToken, adminController.getOneAdmin)
router.patch('/update/comment/:id', adminController.updateComments)
router.patch('/update/suspension/:id', adminController.suspendAccount)
router.patch('/update/post/:id', adminController.updatePosts)
router.patch('/update/profile/:id', adminController.updateProfilePics)

module.exports = router; 