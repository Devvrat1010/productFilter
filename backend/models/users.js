// const mongoose=require('mongoose');

// const allUserschema=new mongoose.Schema({
//     username:String,
//     image: [String],
// })

// module.exports=mongoose.model('Image',allUserschema)
const client = require("../mongodb");
async function allUsers() {
    try {
        const conn=await client.connect();
        const db = conn.db("pixelhub");
        const allUsers = db.collection("allUsers");
        return allUsers;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err, message: "Error connecting to table allUsers" });
    }
}

module.exports = allUsers;
