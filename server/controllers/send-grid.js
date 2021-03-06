const sgMail = require('@sendgrid/mail')
const { response } = require('express')

module.exports = {
    
    post:{
        sendMail:(req,res,next) => {
            console.log(process.env.SENDGRID_APIKEY)
            sgMail.setApiKey(process.env.SENDGRID_APIKEY)

                const msg = {
                to: 'dimitur.mihailov988@gmail.com',
                from: 'dimiturmih@abv.bg',
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                }

                sgMail.send(msg)
                res.send("asd")
            },
    }
}