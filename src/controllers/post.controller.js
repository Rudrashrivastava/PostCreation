const postModel=require('../models/post.model');
const jwt=require('jsonwebtoken')

//Imagekit ko kia require
const ImageKit = require("@imagekit/nodejs");
//{toFile} ko destructure kia @imagekit/nodejs
const { toFile}=require('@imagekit/nodejs');
const { get } = require('../routes/post.routes');

const identifyingUser=require("../middlewares/auth.middleware");

const imageKit=new ImageKit({
    privatekey:process.env.ImageKit_PRIVATE_KEY
})


async function createPostController(req,res){
    console.log(req.body, req.file);


  
    //file ko krege upload
       const file = await imageKit.files.upload({
          file: await toFile(Buffer.from(req.file.buffer), 'file'),
          fileName: 'Test',
          folder:'insta_Clone'
});

    //await ke bad file ko hum send krrae hoge cloud storage per 
    res.send(file);


    const {caption}=req.body.caption
    const post=postModel.create({
        caption,
        img_url:file.url,
        user:req.user.id
    })

   return res.status(201).json({
        message:"post created Succedfully...."
   })
}

   

async function getPostController(req,res){


        const userId=req.user.id;

        const posts=await postModel.find({
            user:userId
        });

        if(posts.length===0){
            return res.status(404).json({
                message:"user dont create any post yet"
            })
        }

        return res.status(200).json({
            message:"posts fetched Succesfulyy",
            posts
        })


    }

    async function specificPostController(req,res){



        const userId=req.user.id;
        const postId=req.params.postId;

        const post=await postModel.findById(postId);

        if(!post){
            return res.status(404).json({
                message:"post not found"
            })
        }

        const isValidUser=userId===post.user.toString();

        if(!isValidUser){
            return res.status(403).json({
                message:"forbidden content not your post"
            })
        }

        
        return res.status(200).json({
            message:"post fetched succesfully..",
            post
        })
    }

    module.exports={
        createPostController,
        getPostController,
        specificPostController
    }
