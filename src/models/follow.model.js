const mongoose=require('mongoose');

const followSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"follower name is requied to be present in users.."]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Followe is required  to be present in users.."]
    }
},{
    timestamps:true
})

//unique index combo
unique.index({follower:1,followee:1},{unique:true});

const followModel=mongoose.model("follows",followSchema);

module.exports=followModel;

