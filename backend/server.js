// const express = require('express')

import express from "express"
import dotenv from "dotenv"
import authRoute from './routes/auth.route.js'
import connectDb from "./db/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use("/api/auth", authRoute)

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("Hello Friends");
// })

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
    connectDb();

})