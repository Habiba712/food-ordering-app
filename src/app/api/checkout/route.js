import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import MenuItem from "../../models/menuItems.model";
import Order from "../../models/order.model";
 const stripe = require('stripe')(process.env.STRIPE_SK);

const connectToDatabase = async () => {
    mongoose.connect(process.env.DATABASE_URL)
    const getSession = await getServerSession(authOptions)
    return getSession;
}
export async function POST(req) {
    const session = await connectToDatabase();
    const { data, adress, amountToPay } = await req.json()
    console.log('data', data);
    
   
// console.log('data', data)
    const strip_line_items = []
    
  
    for (const item of data){
        const productInfo = await MenuItem.findById(item.id)
        let productPrice = Number(item.itemBasePrice)
       
        // console.log('productData', productInfo)
         if(item.size){
            const getSizeFromAllSizes = productInfo.additionalProps.sizes.
            find(s => s.name === item.size.name)
                            console.log('getSizeFromAllSizes', getSizeFromAllSizes) 
         
            productPrice += getSizeFromAllSizes.price
        }

        if(item?.extras?.length > 0){
            for (const extra of item.extras){
                const getDbExtras = productInfo.additionalProps.ingredients.
                find(e => e.name === extra.name)

                productPrice += getDbExtras.price
            }
        }
        // console.log('productPrice', productPrice)
        strip_line_items.push({
            quantity: 1,
            price_data:{
                currency: 'USD',
                product_data:{
                    name: item.itemName,
                    
                    
                },
                unit_amount:productPrice * 100,
                
            },

        })
    }
      const order = new Order({
        userEmail: adress.userEmail,
        cartItems: data,
        deliveryFee: 500,
        phone: adress.phone,
        street: adress.street,
        country: adress.country,
        city: adress.city,
        postCode: adress.postCode,
        paid: false,
        amountToPay: amountToPay
    })
    // console.log('order', order)
    await order.save();
    // console.log('strip_line_items', strip_line_items)
    console.log('order.id', order.id.toString());
    const stripe_checkout_session = await stripe.checkout.sessions.create({

        line_items: strip_line_items,
        metadata: { orderId: order.id.toString()},
        customer_email: adress.userEmail,
        mode: 'payment',
        success_url: process.env.NEXTAUTH_URL + '/pages/orders' + `/${order.id}`,
        cancel_url: process.env.NEXTAUTH_URL + '/pages/cart?cancel=1',
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery Fee',
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 500,
                        currency: 'usd',
                    }

                }
            }
        ]
    });


    // return Response.json({ message: 'Checkout route hit successfully!' });
    return Response.json(stripe_checkout_session.url)
}