import { userModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    const {email,password,fullname} = req.body;
    if(!email || !password || !fullname) {
        return res.status(400).json({message: "All fields are required"});
    }
    if(password.length < 6) {
        return res.status(400).json({message: "Password must be more than 6"});
    }
    try {
        const userExist = await userModel.findOne({email});
        if(userExist) {
            return res.status(400).json({
                message: "User already exists",
                status: false
            })
        }

        const idx = Math.floor(Math.random()*100)+1 ;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const hashedPass = await bcrypt.hashSync(password,10);

        const newuser = new userModel({email,password: hashedPass,fullname,profilePic:randomAvatar});
        await newuser.save();
        return res.status(200).json({
            message: "Registration Success",
            status: true,
            newuser
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: "Internal server error",
            status: false,
            error
        })
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.json({
            message: "All fields are required"
        })
    }
    if(password.length < 6) {
        return res.json({
            message: "password should be more than 6"
        })
    }
    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User not exists",
                status: false
            })
        }
        const comparePass = await bcrypt.compareSync(user.password, password);
        // if(!comparePass) {
        //     return res.status(400).json({
        //         message: "Password not match",
        //         status: false
        //     })
        // }
        const token = await jwt.sign({userId: user._id},process.env.JWT_SK,{"expiresIn": "2d"});
        res.cookie("jwt",token,{
            maxAge: 3*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        return res.status(200).json({   
            message: "Login success",
            status : true,
            user,
            token
        })
    } catch (error) {
        return res.status(404).json({
            message: "Internal server error",
            status: false,
            error
        })
    }
}

export const logout = async(req, res) => {
    await res.clearCookie("jwt");
    return res.json({
        message: "logout success"
    })
}