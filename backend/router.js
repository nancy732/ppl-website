var express = require("express")
var router = express.Router()
const passport = require("passport")
var passportSetup = require('./config/passport-setup')
var signin = require('./mongooseFile');
var upload = require('./schema');

var multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => 
  {
    cb(null, '/home/com123/newProject/backend/public/profile' )
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
var upload = multer({storage: storage});
console.log("we are on router.js")
var userapi = require('./api');


router.post('/user',async function(req,res){
 data = req.body
  try
  {
    let resFromAPI = await userapi.user(data); 
    res.send(resFromAPI)
  }
  catch(err)
  {
    res.send(err)
  }
          
})


router.post('/users', async function(req,res){
  console.log("data")
  try{
    let resultFromAPI = await userapi.users(req.body)
    res.send(resultFromAPI)
  }
  catch(err){
    res.send(err) 
  }
  
})

router.post('/forgot',async function(req,res){
    try{
      let resultOfForgot = await userapi.forgot(req.body)
      res.send(resultOfForgot)
    }
    catch(err)
    {
      res.send(err)
    }
})

router.post('/upload',(req,res,next)=>{
  next();
},upload.single('avatar'),async function(req,res){
  
  try{
    let data = req.body;
    data.fileName = req.file.originalname;
    let resultOfUpload = await userapi.Upload(data)
    res.send(resultOfUpload)
  }
  catch(err)
  {
    res.send(err)
  }
})

router.get('/onload',async function(req,res){
  try
  {
    let resultOfOnload = await userapi.Onload()
    res.send(resultOfOnload)
  }
  catch(err)
  {
    res.send(err)
  }
})

router.get('/check',async function(req,res)
{
  console.log("djsdkj"+req.query.email);
  signin.updateOne({email: req.query.email},{$set:{verifyUser:true}},function(err,result){
    if(err)
    {
      res.send(err)
    }
    else
    {
      res.sendFile('/home/com123/Desktop/node demo/public/login.html')
    }
  })
})

router.get('/google', passport.authenticate('google',{
  scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>
{
 
  res.redirect('/game?origin=${req.originalUrl}');

});


router.get('/game',function(req,res)
{
  res.sendFile('/home/com123/Desktop/node demo/public/game2.html')
}
)

router.get('/',(req,res)=>{
  res.sendFile('/home/com123/Desktop/node demo/public/web.html')
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/test',function(req,res){
  console.log(req.body);
})

 
  module.exports = router;