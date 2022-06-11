const adminSchema = require('../models/admin')
const userSchema = require('../models/user')
const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//REGISTERING NEW ADMINS

const createSuperAdmin = async (req, res) => {

    
    const { email } = req.body;  //get admin email

    const superAdminEmail = await superAdminSchema.findOne({ email }).lean(); // check if email is already existing in Admin category
    const adminEmail = await adminSchema.findOne({ email }).lean();
    const userEmail = await userSchema.findOne({ email }).lean();
    

    if(superAdminEmail || adminEmail || userEmail) {
        //User with email existing
        return res.json({status: 'error', error: 'Email already existing'})
    } else {
        const password = await bcrypt.hash(req.body.password, 10) //hash password
        const superAdmin = new superAdminSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            profile: req.body.profile,
            comment: req.body.comment,
            post: req.body.post,
            password: password,
            confirmPassword: password
        }) // Create a new ADMIN from inputted data

        superAdmin.save().then(() => {
            console.log('Super Admin Created')
            res.status(200).json({message: 'Super Admin created', status: 'ok'}) // add new user to the database
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

// GET CURRENT SUPER ADMIN
const getOneSuperAdmin = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            superAdminSchema.find({_id: req.params.id}, (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json(result)
                }
            })
        }
    })
}

// UPDATE ADMIN COMMENT SECTION
const updateSuperComments = async (req, res) => {
    const superComments = await superAdminSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                comment: req.body.comment
            }
        }, {new: true}
    )
    if(superComments) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE SUPER ADMIN POST SECTION
const updateSuperPosts = async (req, res) => {
    const superAdminPosts = await superAdminSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                post: req.body.post
            }
        }, {new: true}
    )
    if(superAdminPosts) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

// UPDATE SUPER ADMIN PROFILE PIC
const updateProfilePics = async (req, res) => {
    const adminProfile = await adminSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                profile: req.body.profile
            }
        }, {new: true}
    )
    if(adminProfile) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

module.exports = {createSuperAdmin, getOneSuperAdmin, updateSuperComments, updateSuperPosts, updateProfilePics}