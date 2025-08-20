const express = require("express");
const adminAuth = require("./middlewares/auth");
const dbConnect = require('./config/database');
const User = require('./models/user');
const { valiidateSignUpdata } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");


app.use(express.json());

app.post("/signup", async (req, res) => {
    try{
        //Validate the data
        valiidateSignUpdata(req);

        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //creating the instance of the user
        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    
});

app.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;
        
        const user = await User.findOne({ emailId: emailId });
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login successfull");
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
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
        const ALLOWED_UPDATES = ["firstName", "age", "gender", "skills","password", "photoUrl", "userId"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));    
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true,
        });
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Error updating " + err.message);
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