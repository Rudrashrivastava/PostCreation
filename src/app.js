const express=require('express');
const authRouter=require("./routes/auth.routes");
const postRouter=require("./routes/post.routes")
const cookieparser=require("cookie-parser");
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieparser())

/***
 * prefix 
 */
app.use("/api/auth",authRouter);

/***
 * prefix 
 */
app.use("/api/posts",postRouter)
module.exports=app;