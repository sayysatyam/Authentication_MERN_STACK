const nodemailer = require("nodemailer");
require("dotenv").config();

const mailtrapClient = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Must be false for port 587
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, // Must be a 16-character App Password
  },
});

const sender = {
  email: process.env.EMAIL_USER,
  name: "Satyam",
};

module.exports = { mailtrapClient, sender };