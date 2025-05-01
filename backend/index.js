import express from "express"
import { connectDB } from "./api/utils/coonectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./api/routes/user.routes.js";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cookieParser());

app.use("/auth",userRouter);

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