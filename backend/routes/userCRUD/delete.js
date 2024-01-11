const express = require("express");
const router = express.Router();
const User=require('../../models/users')

router.post("/", async (req, res) => {
    try{
        const {email}=req.body
        const user=await User()
        const result=await user.deleteOne({email:email})
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: error })
    }
})

module.exports = router;