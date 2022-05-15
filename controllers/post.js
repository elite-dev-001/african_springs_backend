const postSchema = require('../models/post');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//CREATING A NEW POST
const createNewPost = async (req, res) => {

    cloudinary.config({
        cloud_name: "wilsonchinedu",
        api_key: "147132482297155",
        api_secret: "TuC__zwwBXQ764YO3Y_vXr73p00"
    })

    cloudinary.uploader.upload(req.file["path"], (error, result) => {
        
        if(result) {
            console.log(result['secure_url'])

            const newPost = new postSchema({
                category: req.body.category,
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                thumbnail: result['secure_url'],
                news: req.body.news,
                comment: req.body.comment,
                active: true,
                trending: false
            })

            newPost.save().then(() => {
                console.log('Post Created')
                res.status(200).json({message: 'Post created', status: 'ok'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })

        } else {
            res.status(500).json({message: error})
        }
    })

    
}

//GET ALL POST
const getAllPost = (req, res) => {
    
      
            postSchema.find({}, (err, results) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({results})
                }
            })
        
    
}

// UPDATE NEWS DETAILS
const updateNews = async (req, res) => {
    const newsUpdate = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                category: req.body.category,
                title: req.body.title,
                news: req.body.news,
            }
        }, {new: true}
    )
    if(newsUpdate) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE COMMENT SECTION
const updateComments = async (req, res) => {
    const postComments = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                comment: req.body.comment
            }
        }, {new: true}
    )
    if(postComments) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE POST STATUS
const postStatus = async (req, res) => {
    const status = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                active: req.body.active
            }
        }, {new: true}
    )
    if(status) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE TRENDING STATUS
const trendingStatus = async (req, res) => {
    const trending = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                trending: req.body.trending
            }
        }, {new: true}
    )
    if(trending) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

module.exports = {createNewPost, getAllPost, updateNews, updateComments, postStatus, trendingStatus};