const passport = require("passport") 
const googleStrategy = require("passport-google-oauth20")
const keys = require('./keys')
const signin = require('../mongooseFile')


passport.serializeUser((Users,done)=>{
    done(null,Users.id)
})

passport.deserializeUser((id,done)=>{
    signin.findById(id).then((Users)=>{
        done(null,Users)
    })
})

passport.use(new googleStrategy({
    //options for the google strategies
    callbackURL:'/auth/google/redirect ',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken,refreshToken,profile,done) => {
    //passport cb function
    signin.findOne({email: profile.id}).then((currentUser)=>{
        if(currentUser)
        {
            done(null,currentUser);
            console.log('user is')
            
        }else
        {
            signin.create({
                Username: profile.displayName,
                email: profile.id,
                
            }).then((user)=>{
                done(null,user);

            }) ;
        }
    })

    
})   
)