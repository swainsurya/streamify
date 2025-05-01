import express from "express"
import "dotenv/config"
import { connectDB } from "./api/utils/coonectDB.js";

const app = express();
const port = process.env.PORT || 4000 ;


app.get("/",(req, res) => {
    res.json({
        message: "Server is running fine"
    })
})

connectDB()
.then(() => {
    app.listen(port,()=> console.log("Server is running fine"));
})
.catch(() => console.log("Internal server error"));