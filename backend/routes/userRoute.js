import e from "express";
import {
  registerUser,
  loginUser,
  userCredits,
} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = e.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
// userRouter.post("/pay-razor", userAuth, paymentRazorpay);

export default userRouter;
