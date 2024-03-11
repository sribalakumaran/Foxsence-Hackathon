import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    cafeID:{type:mongoose.Schema.Types.ObjectId, ref:"cafeterias", required:true},
    totalAmount:{type:Number, required:true},
    orderDate:{type:Date, required:true},
    location:{type:String, required:true},
    readyTime:{type:Date, required:true},
    orderItemID:[{type:mongoose.Schema.Types.ObjectId, ref:"orderItem",required:true}],
    orderStatus:{type:String, required:true},
    orderType:{type:String, required:true}
});

export const orderModel=mongoose.model("order",orderSchema);
