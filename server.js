import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import dbConnection from "./config/database.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.send("Restaurant App is running!....")
})

dbConnection();

app.listen(port, ()=>{
    console.log(`Server is running in the ${port}`);
    
})

