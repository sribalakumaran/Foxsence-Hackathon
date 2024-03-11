import mongoose from "mongoose";

const orderItemSchema=new mongoose.Schema({
    orderID:{type:mongoose.Schema.Types.ObjectId, ref:"order", required:true},
    itemID:[{type:mongoose.Schema.Types.ObjectId, ref:"item", tequired:true}]
});

export const orderItemModel=mongoose.model("orderItem",orderItemSchema);
