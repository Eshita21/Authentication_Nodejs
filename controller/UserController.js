const UserModel = require("../model/UserModel");
exports.index = (req, res) => {
    loginData = {}  
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render("registration", {
        title: "Registration",
        message: req.flash('message'),
        data: loginData
        
    })
}
exports.userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        res.redirect("/");
    }
}
exports.user_dashboard = (req, res) => {
    if (req.user) {
        UserModel.find({}, function(err, details) {
            if (!err) {
                res.render('user_dashboard', {
                    title: "User Dashboard",
                    data: req.user,
                    details: details
                })
            } else {
                console.log(err);
            }
        })
    }
}

exports.logout = (req, res) => {
    res.clearCookie("User_Token");
    res.redirect("/");
}