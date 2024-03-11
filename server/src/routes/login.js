import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/users.js";

const loginRoutes=express.Router();

loginRoutes.post("/register",async(req,res)=>{
    try {
        const {username, password, role, name, campus, contactno}=req.body;
        const user=await UserModel.findOne({username});
        
        if (user) {
            return res.json({message:"User already exists!"});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new UserModel({username:username,password:hashedPassword,role:role,name:name,campus:campus,contactno:contactno});
        await newUser.save();
        res.json({message:"Added to the database"})
    } catch (error) {
        console.log(error);
    }
})

loginRoutes.post("/login",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await UserModel.findOne({username});
        if(!user){
            return res.json({message:"User does not exists create new user"});
        }
        else{
            const ispassword=await bcrypt.compare(password,user.password);
            if(ispassword){
                res.json({userID:user._id,role:user.role,username:user.username});
            }
            else{
                return res.json({message:"Invalid Username or Password"});
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

export {loginRoutes};