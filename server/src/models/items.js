import mongoose from "mongoose";

const ItemSchema=new mongoose.Schema({
    itemDescription:{type:String, required:true},
    itemName:{type:String, required:true},
    price:{type:Number, required:true},
    dietaryInformation:{type:String, required:true},
    preparingTime:{type:Date, required:true},
    cafeteriaID:{type:mongoose.Schema.Types.ObjectId, ref:"cafeterias", required:true}
});

export const ItemModel=mongoose.model("item",ItemSchema);
