const nodemailer = require('nodemailer');

const nodemailerTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const sendEmailTemplate = async (emailTemplate) => {
    return await nodemailerTransporter.sendMail(emailTemplate);
}

module.exports = { 
    sendEmailTemplate,
};