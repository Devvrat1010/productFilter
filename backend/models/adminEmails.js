const client = require("../mongodb");
async function adminEmails() {
    try {
        const conn=await client.connect();
        const db = conn.db("pixelhub");
        const adminEmails = db.collection("adminEmails");
        return adminEmails;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err, message: "Error connecting to table adminEmails" });
    }
}

module.exports = adminEmails;
