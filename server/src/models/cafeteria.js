import mongoose from "mongoose";

const CafeSchema=new mongoose.Schema({
    name:{type:String, required:true},
    adminID:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    itemID:[{type:mongoose.Schema.Types.ObjectId, ref:"items"}]
});

export const CafeModel=mongoose.model("cafeterias",CafeSchema);
