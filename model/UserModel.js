const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
    type: String,
    required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = new mongoose.model("Login_Registration", UserSchema);
module.exports = UserModel;