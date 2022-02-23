const express=require('express');
const Route=express.Router();
const AuthController=require('../controller/AuthController')
const verifySignin=require('../middleware/VerifySignin')

Route.post("/signup", [verifySignin.checkDuplicateValue], AuthController.signup)
Route.post("/signin", AuthController.signin);
module.exports = Route;