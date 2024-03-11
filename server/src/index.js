import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { loginRoutes } from "./routes/login.js";
import { cafeRoutes } from "./routes/cafe.js";
import { orderRoutes } from "./routes/order.js";
const app=express();

app.use(express.json());
app.use(cors());
app.use("/",loginRoutes);
app.use("/cafe",cafeRoutes);
app.use("/order",orderRoutes);

mongoose.connect("mongodb+srv://sribalakumarans:4BRLZQ3e3DDcQT8m@cluster0.4zcjtm5.mongodb.net/CafeteriaOrderingSystem?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to DB");
});

app.listen(5000,()=>{
    console.log("Running on PORT 5000");
})