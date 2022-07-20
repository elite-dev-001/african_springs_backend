const generalSchema = require('../models/general')

//CREATING A NEW POST
const createGeneralPost = async (req, res) => {

            const newGeneralPost = new generalSchema({
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
                active: false,
                trending: false,
                featured: false
            })

            newGeneralPost.save().then(() => {
                console.log('Post Created')
                res.status(200).json({message: 'Post created', status: 'ok'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })
    
}

//GET ALL POST
const getAllPost = (req, res) => {

    // const {limit} = req.query;

    generalSchema.find({}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json({results})
        }
    }).sort({date: -1})

        
    
}

//GET SINGLE POST
const getSinglePost = (req, res) => {
    generalSchema.find({_id: req.params.id}, (err, results) => {
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
    const newsUpdate = await generalSchema.findByIdAndUpdate(
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
    const findPost = await generalSchema.findById({_id: req.params.id})
    const comment = Array.from(findPost['comment'])
    console.log(req.body)
    comment.push(req.body)
    const postComments = await generalSchema.findByIdAndUpdate(
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
    const status = await generalSchema.findByIdAndUpdate(
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
    const trending = await generalSchema.findByIdAndUpdate(
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
    const featured = await generalSchema.findByIdAndUpdate(
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
    const thumbnail = await generalSchema.findByIdAndUpdate(
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
    generalSchema.findByIdAndDelete({_id: req.params.id}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err})
        } else {
            res.status(200).json(results)
        }
    })
}

module.exports = {createGeneralPost, getAllPost, updateNews, updateComments, postStatus, trendingStatus, featuredStatus, getSinglePost, thumbnailUpdate, deleteSinglePost};