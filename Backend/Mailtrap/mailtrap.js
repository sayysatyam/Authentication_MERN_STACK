const nodemailer = require("nodemailer");
require("dotenv").config();
const mailtrapClient = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sender = {
  email: process.env.EMAIL_USER,
  name: "Satyam",
};

module.exports = { mailtrapClient, sender };