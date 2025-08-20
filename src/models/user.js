const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
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
    },
    password: {
        type: String,
        required: true,
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