import { Router } from "express";
import { login, logout, onboard, register } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/login",login);
userRouter.post("/register",register);
userRouter.post("/logout",logout);

userRouter.post("/onboarding",protectedRoute,onboard);

export default userRouter;