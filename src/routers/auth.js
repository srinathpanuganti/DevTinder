const express = require("express");
const { valiidateSignUpdata } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter  = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null), {
        expires: new Date(Date.now()),
    };

    res.send("Logout succuessful");
})

module.exports = authRouter;