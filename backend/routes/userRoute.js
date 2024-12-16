import e from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
