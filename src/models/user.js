const mongoose = require("mongoose");
const validator =  require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Id");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password");
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        min: 18,
    },
    gender: {
        type: String,
        trim: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is invalid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://image.png", 
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL");
            }
        }
    },
    skills: {
        type: [String],
        trim: true,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);