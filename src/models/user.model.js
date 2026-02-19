const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required for registering"],
        unique:[true,"username already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required for registering"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required for registering"],
        unique:[true,"password already exists"]
    }
})

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;