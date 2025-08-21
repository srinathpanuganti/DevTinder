const express = require("express");
const adminAuth = require("./middlewares/auth");
const dbConnect = require('./config/database');
const User = require('./models/user');
const { valiidateSignUpdata } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());

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
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();

            // Add the token to cookie and send the repponse back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });

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

app.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    //sending connection request
    console.log("sending connection request");

    res.send(user.firstName + " sent the connection request");
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