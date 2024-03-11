import express from "express";
import { UserModel } from "../models/users.js";
import { CafeModel } from "../models/cafeteria.js";
import { ItemModel } from "../models/items.js";

const cafeRoutes=express.Router();

cafeRoutes.post("/:adminID",async(req,res)=>{
    try{
        const admin=await UserModel.findById(req.params.adminID);
        const name=req.body.name;
        const adminID=admin._id;

        const newCafe=new CafeModel({name:name,adminID:adminID,itemID:[]});
        await newCafe.save();
        res.json({message:"New cafe added to the database"});
    }
    catch(err){
        console.log(err)
    }
})

cafeRoutes.post("/:cafeteriaID/addItems",async(req,res)=>{
    try{
        const {itemDescription,itemName,price,dietaryInformation,preparingTime}=req.body;
        const cafeID=req.params.cafeteriaID;
        const item=await ItemModel.find({itemName,cafeID});
        if(item.length>0){
            res.json("Item already present")
        }
        else{
            const newItem=new ItemModel({itemDescription:itemDescription,itemName:itemName,price:price,dietaryInformation:dietaryInformation,preparingTime:preparingTime,cafeteriaID:cafeID});
            const nitem=await newItem.save();
            console.log("Items added in Items database");
            const updateCafe=await CafeModel.findByIdAndUpdate(cafeID,{$push: { itemID: nitem._id }},{new:true});
            res.json(updateCafe);
        }
    }
    catch(err){
        console.log(err);
    }
})

export {cafeRoutes};