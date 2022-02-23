const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    UserModel({
        userName: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((error, user) => {
        if (!error) {
            console.log("User Added Successfully...");
            req.flash("message", "User Added successfully");
            res.redirect("/");
        } else {
            console.log("User Not Added", err);
        }
    })
}

exports.signin = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const hashPassword = data.password;
            if (bcrypt.compareSync(req.body.password, hashPassword)) {
                const token = jwt.sign({
                    id: data._id,
                    username: data.userName,
                    email: data.email,
                    phone: data.phone
                }, "eshita-170998@#1!5278", { expiresIn: '10m' });
            res.cookie("User_Token", token);
            if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data);
                res.redirect("user_dashboard");
            } else {
                req.flash("message", "Invalid Password !");
                res.redirect("/");
            }

        } else {
            req.flash("message", "Invalid Email !");
            res.redirect("/");
        }
    })
}