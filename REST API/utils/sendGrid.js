const sgMail = require('@sendgrid/mail')


module.exports = ({email,subject,text}) => {
    sgMail.setApiKey(process.env.SENDGRID_APIKEY)

    const msg = {
    to: email,
    from: 'dimiturmih@abv.bg',
    subject: subject,
    text: text,
    html: text,
    }
    sgMail.send(msg)
    return 'success'
}