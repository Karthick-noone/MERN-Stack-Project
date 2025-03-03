// const express = require('express')

import express from "express"
import dotenv from "dotenv"
import authRoute from './routes/auth.route.js'
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)


// app.get('/', (req, res) => {
//     res.send("Hello Friends");
// })

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
    connectDb();

})