// emailSender.js
const nodemailer = require('nodemailer');

// Create a transporter object using your email provider's SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to any email provider
    auth: {
        user: process.env.EMAIL_USERNAME,  // Your email username (set in environment variables)
        pass: process.env.EMAIL_PASSWORD,  // Your email password (set in environment variables)
    },
});

/**
 * Send an email notification.
 * @param {String} to - Recipient email.
 * @param {String} subject - Email subject.
 * @param {String} text - Email body text.
 */
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,  // Sender email
            to,                                // Recipient email
            subject,                           // Email subject
            text,                              // Email body content
        });

        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendEmail;
