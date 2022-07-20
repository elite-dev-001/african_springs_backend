const express = require('express')
const mongoose = require('mongoose')
const createUserRoute = require('./routes/user')
const loginRoute = require('./routes/login')
const postRoute = require('./routes/post')
const adminRoute = require('./routes/admin')
const generalRoute = require('./routes/general')
const superAdminRoute = require('./routes/super_admin')
const resetPasswordRoute = require('./routes/password_reset')
const cors = require('cors')
// const fileUpload = require('express-fileupload')


let port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

// app.use(fileUpload({
//     useTempFiles: false
// }))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//API ROUTES FOR USERS
app.use('/api/user/', createUserRoute);

//API ROUTES FOR NEWS POSTING
app.use('/api/post/', postRoute)

//API ROUTES FOR NEWS General
app.use('/api/general/', generalRoute)

//API ROUTES FOR ADMINS
app.use('/api/admins/', adminRoute)

//API ROUTES FOR SUPER ADMINS
app.use('/api/super/admins/', superAdminRoute)

//API ROUTE FOR LOGIN
app.use('/api/login', loginRoute)

//API ROUTES FOR PASSWORD RESET
app.use('/api/reset/', resetPasswordRoute)

//MONGOOSE CONNECT
mongoose.connect(
    'mongodb+srv://africansprings:Xl0A4BmmmHO60gu4@cluster0.hczsq.mongodb.net/AfricanSprings?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    app.listen(port, () => {
        console.log('API running at: http://localhost:5000')
    })
}).catch((err) => {
    console.log(err)
})











//Xl0A4BmmmHO60gu4

// mongodb+srv://africansprings:<password>@cluster0.hczsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority