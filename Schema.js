const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    username: String,
    password: String,
     todos:[]


})


// const todoSchema = new mongoose.Schema({

//     username:String,
//     data:String
    
// })

//const todoModel = mongoose.model("todoModel",todoSchema)
const userModel = mongoose.model("userModel",userSchema)

module.exports = {userModel,//todoModel}
