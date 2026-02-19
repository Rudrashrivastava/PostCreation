const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
       default:"https://ik.imagekit.io/zu6vw4x30h/userimage.webp"
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user :id is required to know which user create the post"]
    }
})

const postModel=mongoose.model("posts",postSchema);

module.exports=postModel;