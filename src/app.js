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

// Get user my email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    
    try{
        const user = await User.find({ emailId: userEmail });
        if(user.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    } 
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

// Feed API = GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{ 
        const users = await User.find({});
        res.send(users);
    }
    catch{
        res.status(400).send("Something went wrong");
    }
})

//delete user from the Db
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted succesfully");
    }
    catch{
        res.status(400).send("Something went wrong");
    }
})

//Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true,
        });
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Error updating" + err.message);
    }
})


dbConnect().then(() => {
    console.log("Database connectiom established");
    app.listen(3000, () => {
    console.log("Server is successfully listining on port 3000");
    });
})
.catch((err) => {
    console.error("Database cannot be connected");
});