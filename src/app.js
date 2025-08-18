const express = require("express");
const adminAuth = require("./middlewares/auth");
const dbConnect = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    // const uerObj = {
    //     firstName: "srinath",
    //     lastName: "panuganti",
    //     emailId: "srinath@gmail.com",
    //     password: "1223",
    //     age: "24",
    //     gender: "male"

    // }
    //creating the instance of the user
    const user = new User(req.body);
    
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

dbConnect().then(() => {
    console.log("Database connectiom established");
    app.listen(3000, () => {
    console.log("Server is successfully listining on port 3000");
    });
})
.catch((err) => {
    console.error("Database cannot be connected");
});