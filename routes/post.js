const express = require('express')
const postController = require('../controllers/post');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/create/news', upload.single('thumbnail') ,postController.createNewPost);
router.get('/get/all/news', postController.getAllPost);
router.patch('/update/news/:id', postController.updateNews)
router.patch('/update/comments/:id', postController.updateComments)
router.patch('/update/status/:id', postController.postStatus)
router.patch('/update/trending/:id', postController.trendingStatus)


module.exports = router;