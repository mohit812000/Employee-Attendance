import express from "express";
import { createSignOut, createsignIn, getAttendance, getsingleAttendance } from "../controllers/attendance.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
router.get("/getAttendance", authMiddleware, getAttendance);
router.post("/add-signIn",authMiddleware, createsignIn);
router.post("/add-signOut",authMiddleware, createSignOut );
router.get("/get-singleAttendance/:user_id",getsingleAttendance);


export default router