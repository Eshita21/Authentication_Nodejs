const express=require('express');
const Route=express.Router();
const UserController=require('../controller/UserController');

Route.get("/", UserController.index);
Route.get("/user_dashboard", UserController.userAuth, UserController.user_dashboard)
Route.get("/logout", UserController.logout);
module.exports = Route;