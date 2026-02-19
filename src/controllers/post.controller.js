const postModel=require('../models/post.model');
const jwt=require('jsonwebtoken')

//Imagekit ko kia require
const ImageKit = require("@imagekit/nodejs");
//{toFile} ko destructure kia @imagekit/nodejs
const { toFile}=require('@imagekit/nodejs')


const imageKit=new ImageKit({
    privatekey:process.env.ImageKit_PRIVATE_KEY
})


async function createPostController(req,res){
    console.log(req.body, req.file);

    const token=req.cookies.jwt_token;


    if(!token){
        return res.status(401).json({
            message:"UnAuthorized Access or Token may be expired"
        })
    }

    let decode=null;
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message:"User Not Authorized...",
            error:err.message
        })
    }

    //file ko krege upload
       const file = await imageKit.files.upload({
          file: await toFile(Buffer.from(req.file.buffer), 'file'),
          fileName: 'Test',
          folder:'insta_Clone'
});
    //await ke bad file ko hum send krrae hoge cloud storage per 
    res.send(file);

    const post=postModel.create({
        caption:req.body.caption,
        img_url:file.url,
        user:decode.id
    })

   return res.status(201).json({
        message:"post created Succedfully...."
   })
}

   





















module.exports={
    createPostController,
}