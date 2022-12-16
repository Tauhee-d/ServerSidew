const mongoose  =require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      },
      password: {
        type: String,
        required: true,
      },
      confirmPassword: {
        type: String,
        // required:true
      }
})

// const userModel = mongoose.model('User',userSchema)

// export default userModel
module.exports = mongoose.model('User',userSchema)