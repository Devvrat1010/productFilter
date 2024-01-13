const express = require("express");
const router = express.Router();
const User=require('../../models/users')

router.post("/", async (req, res) => {
    try{
        const {email,admin}=req.body
        const user=await User()
        if (admin===true){
            const result=await user.deleteOne({email:email})
            res.status(200).json(result)
        }
        else{
            res.status(401).json({ error: "You are not authorized to delete this user" })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: error })
    }
})

module.exports = router;