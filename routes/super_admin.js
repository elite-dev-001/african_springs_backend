const express = require('express')
const superAdminController = require('../controllers/super_admin')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', superAdminController.createSuperAdmin);
router.get('/get/one/:id', ensureToken, superAdminController.getOneSuperAdmin);
router.patch('/update/comment/:id', superAdminController.updateSuperComments);
router.patch('/update/post/:id', superAdminController.updateSuperPosts);

module.exports = router;