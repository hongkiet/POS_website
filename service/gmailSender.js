require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (toEmail, subject, text) => {
    const mailOptions = {
        from: "Service",
        to: toEmail,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
module.exports = sendEmail;