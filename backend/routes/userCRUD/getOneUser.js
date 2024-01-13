const express=require('express');
const router=express.Router();
const User=require('../../models/users');

router.get('/',async (req,res)=>{
    try{
        const conn=await User()
        const user=await conn.findOne({email:req.body.email});
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json('Error: '+err);
    }
});

module.exports=router;