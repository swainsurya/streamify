import mongoose from "mongoose";

const uri = process.env.MONGODB_URL;
export const connectDB = async() => {
    await mongoose.connect("mongodb+srv://swainsuryakanta97:0Q9Tzt0ibrZH1T54@cluster0.vgom8ar.mongodb.net/streamify?retryWrites=true&w=majority&appName=Cluster0") 
    .then(() => {
        console.log("DB connected");
        return true;
    })
    .catch((err)=> {
        console.log(err);
        return false;
    })
}