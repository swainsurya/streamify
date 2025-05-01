import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
    bio: {type: String, default: ""},
    profilePic: {type: String, default: ""},
    nativeLanguage: {type: String, default: ""},
    learningLaguage: {type: String, default: ""},
    location: {type: String, default: ""},
    isOnboarded: {type: Boolean, default: false},
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
},{timestamps: true})

// hash password right here 
userSchema.pre("save",async(next) => {
    if(!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password,10);
        next();
    } catch (error) {
        
    }
})

export const userModel = mongoose.model("user",userSchema);