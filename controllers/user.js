const userSchema = require('../models/user');
const adminSchema = require('../models/admin')
const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//REGISTERING NEW USERS

const createUser = async (req, res) => {

    
    const { email } = req.body;  //get user email

    const userEmail = await userSchema.findOne({ email }).lean(); // check if email is already existing in User category
    const adminEmail = await adminSchema.findOne({ email }).lean();
    const superAdminEmail = await superAdminSchema.findOne({ email }).lean();
    

    if(userEmail || adminEmail || superAdminEmail) {
        //User with email existing
        return res.json({status: 'error', error: 'Email already existing'})
    } else {
        const password = await bcrypt.hash(req.body.password, 10) //hash password
        const user = new userSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            city: req.body.city,
            country: req.body.country,
            comment: req.body.comment,
            suspend: false,
            password: password,
            confirmPassword: password
        }) // Create a new user from inputted data

        user.save().then(() => {
            console.log('User Created')
            res.status(200).json({message: 'User created', status: 'ok'}) // add new user to the database
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

// GET CURRENT USER
const getOneUser = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            userSchema.find({_id: req.params.id}, (err, result) => {
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

// GET ALL USERS

const getAllUsers = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            userSchema.find({}, (err, results) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({results})
                }
            })
        }
    })
}

// UPDATE USER COMMENT SECTION
const updateUserComments = async (req, res) => {
    const userComments = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                comment: req.body.comment
            }
        }, {new: true}
    )
    if(userComments) {
        res.status(200).json({message: "Successfully updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

//UPDATE USER SUSPENSION
const suspendAccount = async (req, res) => {
    const suspension = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                suspend: req.body.suspend
            }
        }, {new: true}
    )
    if(suspension) {
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}


module.exports = { createUser, getOneUser, getAllUsers, updateUserComments, suspendAccount}