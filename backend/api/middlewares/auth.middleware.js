import jwt from "jsonwebtoken";
import "dotenv/config";

export const protectedRoute = async(req, res, next) => {
    const token = req.cookies.jwt ;
    if(!token) {
        return res.status(404).json({
            message: "Unauthorized User",
            status: false
        })
    }
    const decode = await jwt.decode(token,process.env.JWT_SK);
    req.userId = decode.userId ;
    next();
}