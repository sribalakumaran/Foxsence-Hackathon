import express from "express";
import { UserModel } from "../models/users.js";
import { CafeModel } from "../models/cafeteria.js";
import { ItemModel } from "../models/items.js";
import { orderItemModel } from "../models/orderItem.js";
import { orderModel } from "../models/order.js";

const orderRoutes=express.Router();

orderRoutes.post("/:userID/ordering",async(req,res)=>{
    const {orderDate,location,readyTime,items,cafeID,orderType,orderStatus} = req.body;
    const itemID=req.body.items;
    const userID=req.params.userID;
    let amount=0;
    
    let updateOrderItem;


    for(let i=0;i<itemID.length;i++){
        let item=await ItemModel.findById(itemID[i]);
        amount=amount+item.price;
        updateOrderItem=await orderItemModel.findByIdAndUpdate(item,{$push: { orderItemID: item._id }},{new:true});
    }

    const newOrder=new orderModel({userID:userID,cafeID:cafeID,totalAmount:amount,orderDate:orderDate,location:location,readyTime:readyTime,orderItemID:items,orderStatus:orderStatus,orderType:orderType})
    const intialOrder=await newOrder.save();

    const newOrderItem=new orderItemModel({orderID:intialOrder._id,itemID:[]});
    await newOrderItem.save();
    
    //res.json(updateOrderItem);
    // for(let i=0;i<itemID.length;i++){
    //     await orderItemModel.findByIdAndUpdate(newOrderItem._id,{$push:{itemID:itemID[i]}})
    // }
});



export {orderRoutes};