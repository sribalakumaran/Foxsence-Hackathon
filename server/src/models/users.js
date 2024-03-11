import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true},
    name:{type:String, required:true},
    campus:{type:String, required:true},
    contactno:{type:Number, required:true}
});

export const UserModel=mongoose.model("login",UserSchema);
