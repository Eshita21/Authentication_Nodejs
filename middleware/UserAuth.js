const jwt = require("jsonwebtoken");
exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.User_Token) {
        jwt.verify(req.cookies.User_Token, "eshita-170998@#1!5278", (err, data) => {
            req.user = data;
            next()
        })
        
    } else {
    next();
    }
}