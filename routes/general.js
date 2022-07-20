const express = require('express')
const generalController = require('../controllers/general');
// const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post('/create/news' ,generalController.createGeneralPost);
router.get('/get/all/news', generalController.getAllPost);
router.get('/get/single/post/:id', generalController.getSinglePost);
router.patch('/update/news/:id', generalController.updateNews)
router.patch('/update/comments/:id', generalController.updateComments)
router.patch('/update/status/:id', generalController.postStatus)
router.patch('/update/trending/:id', generalController.trendingStatus)
router.patch('/update/featured/:id', generalController.featuredStatus)
router.patch('/update/thumbnail/:id', generalController.thumbnailUpdate)
router.delete('/delete/single/post/:id', generalController.deleteSinglePost)


module.exports = router;