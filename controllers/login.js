const userSchema = require('../models/user');
const adminSchema = require('../models/admin')
const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';



// USER LOGIN

const loginControl = async (req, res) => {

    const {email, password} = req.body;

    const user = await userSchema.findOne({ email }).lean();
    const admin = await adminSchema.findOne({ email }).lean();
    const superAdmin = await superAdminSchema.findOne({ email }).lean();

    if(user) {
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            },
            JWT_SECRET
            )
            return res.json({ status: "ok", data: token, role: 'user'})
        } else {
            return res.json({ status: 'error', error: 'Incorrect password'})
        }
    } else if(admin) {
        if(await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({
                id: admin._id,
                email: admin.email
            },
            JWT_SECRET
            )
            return res.json({ status: "ok", data: token, role: 'admin'})
        } else {
            return res.json({ status: 'error', error: 'Incorrect password'})
        }
    } else if(superAdmin) {
        if(await bcrypt.compare(password, superAdmin.password)) {
            const token = jwt.sign({
                id: superAdmin._id,
                email: superAdmin.email
            },
            JWT_SECRET
            )
            return res.json({ status: "ok", data: token, role: 'superadmin'})
        } else {
            return res.json({ status: 'error', error: 'Incorrect password'})
        }
    }

    res.json({status: 'error', error: 'User does not exist'})
}

module.exports = {loginControl}