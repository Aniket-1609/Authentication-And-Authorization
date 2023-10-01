const express=require('express');
const router=express.Router();

const {login,signup}=require('../cantrollers/Auth');
const {auth,isStudent,isAdmin}=require('../middleware/auth');
const User=require('../models/User');  

router.post('/signup',signup);
router.post('/login',login);

//testing protected route for single middleware
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for tests",
    });
});

//protected routes
router.get('/student',auth,isStudent , (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for students."
    })
})

router.get('/admin',auth,isAdmin , (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for admin."
    })
})

router.get('/getEmail',auth,async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findById(id);

        return res.status(200).json({
            success:true,
            user:user,
            message:"Welcome to email route",
        });
    }
    catch(error){
        return res.status(401).json({
            success:false,
            error:error,
        });
    }
})

module.exports=router;