const express=require('express');
const postRouter=express.Router();
const {identifyingUser}=require("../middlewares/auth.middleware")
const controller=require("../controllers/post.controller");

const multer=require('multer');
const upload=multer({storage:multer.memoryStorage()});

/**
 * POST/ api/posts [protected]
 * -req.body ={caption,image-file}
 */
postRouter.post("/",upload.single('image'),identifyingUser,controller.createPostController);
/**
 * GET/ api/posts [protected]
 * user create the post are only provided
 */
postRouter.get("/",identifyingUser,controller.getPostController);

/**
 * GET/ api/posts/:postId [protected]
 * return the post only which user create it or request to get it 
 * return details about specific post also chk whether the post belong to the user that the request come from 
 */
postRouter.get("/details/:postId",identifyingUser,controller.specificPostController)
module.exports=postRouter;