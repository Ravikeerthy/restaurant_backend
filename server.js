import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import dbConnection from "./config/database.js";
import authRoutes from "./routes/authRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import tableRoutes from "./routes/tableRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/menus", menuRoutes)
app.use("/api/tables", tableRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)

const port = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.send("Restaurant App is running!....")
})

dbConnection();

app.listen(port, ()=>{
    console.log(`Server is running in the ${port}`);
    
})

