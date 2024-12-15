const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    username: String,
    password: String,
    todos:[]


})

const userModel = mongoose.model("userModel",userSchema)

module.exports = {userModel}