import express from "express";
import { getUser, getUsers, signIn, signUp } from "../controllers/user.controller";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = express.Router();
userRouter.get("/getallUsers", authMiddleware,getUsers);
userRouter.get("/get-attendance/:user_id", getUser);
userRouter.post("/sign-up" ,signUp);
userRouter.post("/sign-in",signIn);


export default userRouter;