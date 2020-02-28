const MailGen = require('mailgen')

require('dotenv').config()

const mailGenerator = new MailGen({
  theme: 'salted',
  product: {
    name: 'Flip Image',
    link: 'http://192.168.100.211:8081/',
    // logo: your app logo url
  },
})  

const email = {
  body: {
    name: '',
    intro: 'Welcome to email verification',
    action: {
      instructions: 'Please click the button below to verify your account',
      button: {
        color: '#33b5e5',
        text: 'Verify account',
        link: 'http://192.168.100.211:8081/check'
      },
    },
  },
}



const emailTemplate1 = mailGenerator.generate(email)

module.exports = {email,emailTemplate1,mailGenerator};