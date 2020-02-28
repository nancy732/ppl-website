var express = require("express")
var mongoose = require("mongoose")
var app = express()
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var router = require('./router')
const cors = require('cors')
var passport = require('passport')
var keys = require('./config/keys')
var cookieSession = require('cookie-session')

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
 
app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect('mongodb://localhost:27017/testMongoose', { useNewUrlParser: true, useUnifiedTopology: true }).
     catch(error => handleError(error))
 
console.log("we are on server.js")



app.use('/', router)
app.use(express.static(__dirname + '/public'));
app.use('/auth', router);
app.listen("8081", () => {
    console.log("8081")
})