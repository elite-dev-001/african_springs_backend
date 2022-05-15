const userSchema = require('../models/user');
const adminSchema = require('../models/admin')
const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';

const resetPassword = async (req, res) => {

    const {newPassword, token, email} = req.body;

    const user = await userSchema.findOne({ email }).lean();
    const admin = await adminSchema.findOne({ email }).lean();
    const superAdmin = await superAdminSchema.findOne({ email }).lean();


    if(user) {
        try {
            const userReset = jwt.verify(token, JWT_SECRET)
            const _id = userReset.id
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await userSchema.updateOne({_id}, {
                $set: { password: hashedPassword}
            }).then(() => {
                res.json({ status: 'ok', message: 'Success'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })
        } catch (error) {
            res.json({ status: 'error', error: ';))'})
        }
    } else if(admin) {
        try {
            const adminReset = jwt.verify(token, JWT_SECRET)
            const _id = adminReset.id
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await adminSchema.updateOne({_id}, {
                $set: { password: hashedPassword}
            }).then(() => {
                res.json({ status: 'ok', message: 'Success'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })
        } catch (error) {
            res.json({ status: 'error', error: error})
        }
    } else if(superAdmin) {
        try {
            const superAdminReset = jwt.verify(token, JWT_SECRET)
            const _id = superAdminReset.id
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await superAdminSchema.updateOne({_id}, {
                $set: { password: hashedPassword}
            }).then(() => {
                res.json({ status: 'ok', message: 'Success'})
            }).catch((err) => {
                res.status(500).json({message: err})
            })
        } catch (error) {
            res.json({ status: 'error', error: ';))'})
        }
    }

    // res.json({status: 'error', error: 'User does not exist'})
}

module.exports = {resetPassword}