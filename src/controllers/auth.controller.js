require("dotenv").config();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userModel=require("../models/user.model")


async function chk(req,res) {
    res.send("hello")
}

async function userRegisterController(req,res) {

    const {username,email,password}=req.body;

    const isUserAlreadyRegister=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    
    if(isUserAlreadyRegister){
        return res.status(409).json({
            message:"user"+(isUserAlreadyRegister.email==email?"email already register":"username already register")
        })
    }

    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("jwt_token",token);

    return res.status(200).json({
        message:"user Registered Succesfully..",
        user:{
            username:user.username,
            email:user.email
        },
        token
    })


}
async function userLoginController(req,res) {

    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    
    if(!user){
        return res.status(404).json({
            message:"user not register"
        })
    }

    const isPaswordValid=await bcrypt.compare(password,user.password);

   if(!isPaswordValid){
    return res.status(401).json({
        message:"unauthorized access.."
    })
   }

    const token=jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("jwt_token",token);

    return res.status(200).json({
        message:"user LoggedIn Succesfully..",
        user:{
            username:user.username,
            email:user.email
        },
        token
    })


}
module.exports={
    userRegisterController,
    userLoginController,
    chk,
}