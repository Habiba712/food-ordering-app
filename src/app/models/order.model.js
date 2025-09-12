import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
        minLength:3,
    }, 
    cartItems:Object,
    deliveryFee:{
        type:Number,
        default:500
    },
    phone:{
        type:String,
        required:true,
    }, 
    street:{
        type:String,
        required:true,
    },
    country:
    {
        type:String,
        required:true,
    },
    city:
    {
        type:String,
        required:true,  
    },
    postCode:{
        type:String,
        required:true,
    },
   
    paid:{
        type:Boolean,
        default:false
    }, 


},{timestamps:true})

const Order = mongoose?.models?.Order || mongoose?.model('Order', orderSchema);

export default Order;
