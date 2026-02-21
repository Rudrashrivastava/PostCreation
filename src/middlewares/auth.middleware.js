const jwt=require('jsonwebtoken')
async function identifyingUser(req,res,next){
    const token=req.cookies.jwt_token;

    if(!token){
        return res.status(401).json({
        message:"UnAuthorized Access"
        })
    }

    let decode=null;
    try{
        decode=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
        message:"UNAUTHORIZED ACCES OR EXPIRES TOKEN"
        })
    }

    req.user=decode;
    // jo bhi use request  krega uske details set krdege req.user me

    next();
    //req.user are forwarded to controllers,   middle ware se request ange forward krni hoti h
}


module.exports={
    identifyingUser,
}