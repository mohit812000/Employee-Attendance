import express from "express";
import mongoose from "mongoose"
import userRouter from "./routers/user.router";
import attendanceRouter from "./routers/attendance.router"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
const PORT = 8007;

mongoose.connect("mongodb://localhost:27017/Attendance")
.then(()=>console.log("Connected!"))

app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(userRouter)
app.use(attendanceRouter)

