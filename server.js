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
import staffRoutes from "./routes/staffRoutes.js"
dotenv.config()

const app = express();

app.use(cors(
    {
        origin:[
            "http://localhost:5173"
        ],
        credentials:true,
    }
))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/menus", menuRoutes)
app.use("/api/tables", tableRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/users", staffRoutes)

const port = process.env.PORT || 5000

app.get("/", (req,res)=>{
    res.send("Restaurant App is running!....")
})

dbConnection();

app.listen(port, ()=>{
    console.log(`Server is running in the ${port}`);
    
})

