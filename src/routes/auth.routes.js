const express=require('express');
const controller=require("../controllers/auth.controller")

const authRouter=express.Router();


authRouter.get("/chk",controller.chk)
authRouter.post("/register",controller.userRegisterController);
authRouter.post("/login",controller.userLoginController);


module.exports=authRouter;