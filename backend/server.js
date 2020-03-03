var express = require("express")
var mongoose = require("mongoose")
var app = express()
var bodyParser = require('body-parser')
var router = require('./router')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
 
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/testMongoose', { useNewUrlParser: true, useUnifiedTopology: true }).
     catch(error => handleError(error))
 
console.log("we are on server.js")

app.use('/', router)
app.use(express.static(__dirname + '/public'));
app.listen("8081", () => {
    console.log("8081")
})