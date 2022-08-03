const express = require('express')
const postController = require('../controllers/post');
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/create/news' ,postController.createNewPost);
router.post('/send/sms', postController.sendSms)
router.get('/get/all/news', postController.getAllPost);
router.get('/get/single/post/:id', postController.getSinglePost);
router.patch('/update/news/:id', postController.updateNews)
router.patch('/update/comments/:id', postController.updateComments)
router.patch('/update/status/:id', postController.postStatus)
router.patch('/update/trending/:id', postController.trendingStatus)
router.patch('/update/featured/:id', postController.featuredStatus)
router.patch('/update/thumbnail/:id', postController.thumbnailUpdate)
router.delete('/delete/single/post/:id', postController.deleteSinglePost)


module.exports = router;