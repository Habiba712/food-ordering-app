import mongoose, { Schema } from "mongoose";

const propsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },  
    price:{
        type:Number,
        required:true
    },
}
)
const MenuItemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },  
    itemBasePrice:{
        type:Number,
        required:true
    },
    itemProperties:{
        type:String,
       
    },
    itemImage:{
        type:String,
      
    }, 
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    additionalProps:{
        ingredients:{
            type:[propsSchema],
            required:true
        },
        sizes:{
            type:[propsSchema],
            required:true
        }
    }, 
    quantity:{
        type:Number,
        default:1
    }
},
{
    timestamps: true
}
)

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

export default MenuItem;