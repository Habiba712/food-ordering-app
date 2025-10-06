import MenuItem from "../../models/menuItems.model";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
 import mongoose from "mongoose";
 



const connectToDatabase = async () => {

  mongoose.connect(process.env.DATABASE_URL)
  const getSession = await getServerSession(authOptions)

  return getSession;
}

export async function POST(req) {
    const session = await connectToDatabase();
    const {data, props} = await req.json();
    console.log('props', props);
     const menuItem = new MenuItem(
        {
            itemName: data.itemName,
            itemBasePrice: data.itemBasePrice,
            itemProperties: data.itemProperties,
            itemImage: data.itemImage,
            category: data.selectedCategory,
            additionalProps:{
                ingredients: props.ingredients,
                sizes: props.sizes
            }

        }
    );

    await menuItem.save();
    console.log('menuItem lij', menuItem);
    return Response.json(menuItem);
}
 

export async function GET(){
    const session = await connectToDatabase();

   
   
   const menuItems = await MenuItem.find();
    
     return Response.json(menuItems);

}

export async function PUT(req){
    const session = await connectToDatabase();

    const {id, data, props} = await req.json();
 console.log('data', data)
 console.log('props', props)
    const updatedMenuItem = await MenuItem.updateOne({
        _id:id
    },
    {
        $set:{
            itemName: data.itemName,
            itemBasePrice: data.itemBasePrice,
            itemProperties: data.itemProperties,
            itemImage: data.itemImage, 
            category: data.selectedCategory,
            additionalProps:{
                ingredients: props.ingredients,
                sizes: props.sizes
            }
        }
        
    }

)
console.log('updatedMenuItem', updatedMenuItem);
    return Response.json(updatedMenuItem);

}

export async function DELETE(req) {
    const session = await connectToDatabase();
       console.log('req', req.url); 
       const newUrl = new URL(req.url);
       let prop_label= newUrl.searchParams.get('label');
       if(prop_label === 'Size'){
        prop_label = 'sizes'
       }
       else if(prop_label === 'Ingredient'){
        prop_label = 'ingredients'
       }
       const id = newUrl.searchParams.get('id')
       const prop_id = newUrl.searchParams.get('prop_id')
       console.log('prop_label', prop_label);
       console.log('prop_id', prop_id);
       console.log('id', id);
       if(prop_id){

        await MenuItem.updateOne({_id: id},
                                 {$pull: {
                                           [`additionalProps.${prop_label}`]: {_id: prop_id}
                                          }    
                                 })
                  }
                  
       else{
         await MenuItem.deleteOne({_id: id})
       }

    
       return Response.json({message: 'Item deleted successfully'});
}