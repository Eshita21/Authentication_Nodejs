const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const dbDriver = "mongodb+srv://eshitaBlog:EaTBjx1Zev4y5TBS@cluster0.gdsqv.mongodb.net/Auth3"


app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'eshita',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");



const userRoute = require("./route/UserRoute");
const authRoute = require("./route/AuthRoute");
const userAuth = require("./middleware/UserAuth");

app.use(userAuth.authJwt);
app.use(userRoute);
app.use(authRoute);

const port = process.env.PORT || 1999
mongoose.connect(dbDriver, {useNewUrlParser: true,useUnifiedTopology: true}).then((res) => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
        console.log("Database connection established");
    })
}).catch((err) => {
    console.log(err);
})