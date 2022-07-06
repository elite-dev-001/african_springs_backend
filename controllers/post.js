const postSchema = require('../models/post');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//CREATING A NEW POST
const createNewPost = async (req, res) => {

    // cloudinary.config({
    //     cloud_name: "wilsonchinedu",
    //     api_key: "147132482297155",
    //     api_secret: "TuC__zwwBXQ764YO3Y_vXr73p00"
    // })

    // cloudinary.uploader.upload(req.file["path"], (error, result) => {
        
        // if(result) {
            // console.log(result['secure_url'])

            const newPost = new postSchema({
                category: req.body.category,
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                thumbnail: req.body.thumbnail,
                news: req.body.news,
                posterId: req.body.posterId,
                comment: req.body.comment,
                posterImage: req.body.posterImage,
                link: req.body.link,
                videoLink: req.body.videoLink,
                active: true,
                trending: false,
                featured: false
            })

            newPost.save().then(() => {
                console.log('Post Created')
                res.status(200).json({message: 'Post created', status: 'ok'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })

        // } else {
        //     res.status(500).json({message: error})
        // }
    // })

    
}

//GET ALL POST
const getAllPost = (req, res) => {

    const {category, limit, trend, featured} = req.query;
    // console.log(limit)

    if(trend){
        postSchema.find({trending: true}, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: err})
            } else {
                res.status(200).json({results})
            }
        }).limit(limit)
    } else if(featured){
        postSchema.find({featured: true}, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: err})
            } else {
                res.status(200).json({results})
            }
        }).limit(limit)
    } else {
        postSchema.find(category ? {category: {'$regex' : category, "$options":"i"}} : {}, (err, results) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: err})
            } else {
                res.status(200).json({results})
            }
        }).limit(limit)
    }
    
    // trend ? postSchema.find({trending: true}, (err, results) => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json({message: err})
    //     } else {
    //         res.status(200).json({results})
    //     }
    // }).limit(limit) : postSchema.find(category ? {category: category} : {}, (err, results) => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json({message: err})
    //     } else {
    //         res.status(200).json({results})
    //     }
    // }).limit(limit)
        
    
}

//GET SINGLE POST
const getSinglePost = (req, res) => {
    postSchema.find({_id: req.params.id}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json(results)
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
                author: req.body.author,
                link: req.body.link,
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
    const findPost = await postSchema.findById({_id: req.params.id})
    const comment = Array.from(findPost['comment'])
    console.log(req.body)
    comment.push(req.body)
    const postComments = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                comment: comment
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

//UPDATE FEARTURED
const featuredStatus = async (req, res) => {
    const featured = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                featured: req.body.featured
            }
        }, {new: true}
    )
    if(featured) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}
//UPDATE THUMBNAIL
const thumbnailUpdate = async (req, res) => {
    const thumbnail = await postSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                thumbnail: req.body.thumbnail
            }
        }, {new: true}
    )
    if(thumbnail) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}
//DELETE POST
const deleteSinglePost = (req, res) => {
    postSchema.findByIdAndDelete({_id: req.params.id}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json(results)
        }
    })
}

module.exports = {createNewPost, getAllPost, updateNews, updateComments, postStatus, trendingStatus, featuredStatus, getSinglePost, thumbnailUpdate, deleteSinglePost};