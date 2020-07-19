const sgMail = require('@sendgrid/mail')
const { response } = require('express')

module.exports = {
    
    post:{
        sendMail:(req,res,next) => {
            sgMail.setApiKey('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')

                const msg = {
                to: 'dimitur.mihailov988@gmail.com',
                from: 'dimitur.mihailov_98@abv.bg',
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                }

                sgMail.send(msg)
                res.send("asd")
            },
    }
}