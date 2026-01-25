const express = require("express");
const route = express.Router();
const {login,logout,signup,verifyEmail,forgotPassword,resetPassword, checkAuth, verifyResetToken} = require("../controller/auth");
const {verifyToken} = require('../MiddleWare/user')
route.get("/check-auth",verifyToken,checkAuth)
route.post("/signup",signup);
route.post("/verify-email",verifyEmail);
route.post("/login",login);
route.post("/logout",logout);
route.post("/forgot-password",forgotPassword);
route.get("/reset-password/:token", verifyResetToken);
route.post("/reset-password/:token",resetPassword);

module.exports = route;