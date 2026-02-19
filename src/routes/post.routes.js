const express=require('express');
const postRouter=express.Router();
const controller=require("../controllers/post.controller");

const multer=require('multer');
const upload=multer({storage:multer.memoryStorage()});
/**
 * POST/ api/posts [protected]
 * -req.body ={caption,image-file}
 */

postRouter.post("/",upload.single('image'),controller.createPostController);

module.exports=postRouter;