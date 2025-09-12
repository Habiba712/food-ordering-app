const mongoose = require('mongoose');
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        phone:{
            type:String
        },
        street:{
            type:String
        },
         city:{
            type:String
        },  
        postCode:{
            type:String
        },
         country:{
            type:String
          } ,
            
        image:{
            type:String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
             
        }, 
        admin:{
            type:Boolean
        }

    },
    {
        timestamps: true

    }
);

 
const User = mongoose.models.User || mongoose.model("User", userSchema);


export default User;
