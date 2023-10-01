//auth , isStudent , isAdmin

const jwt=require("jsonwebtoken");
require('dotenv').config();


exports.auth=(req,res,next)=>{
    try{
        //extract JWT token
        const token=req.body.token || req.cookie.token || req.header("Authorization").replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                messge:"Token missing",
            });
        }

        //verify token
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);

           
            req.user=payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                messge:'token is invalid',
            });
        }
        next();
    }
    catch(eror){
        return res.status(401).json({
            success:false,
            message:'Something went wrong,while verifying the token'
        })
    }
}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!='Student'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

exports.isAdmin=(req,res,next)=>{

    try{
        if(req.user.role!='Admin'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"User role is not matching"
        })

    }
}