const nodemailer = require("nodemailer");
require("dotenv").config();

const mailtrapClient = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Must be false for port 587
  requireTLS: true, // Forces a secure connection
  auth: {
    user: "sayysatyam@gmail.com", 
    pass: "uvrocagusljozhfw", // Must be a 16-character App Password
  },
});

const sender = {
  email: process.env.EMAIL_USER,
  name: "Satyam",
};

module.exports = { mailtrapClient, sender };