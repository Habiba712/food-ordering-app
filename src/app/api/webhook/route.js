import Order from '../../../app/models/order.model';
import mongoose from 'mongoose';
 
import Stripe from 'stripe';


const stripe = new Stripe('process.env.STRIPE_SK');
 

export async function POST(req) {

  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')
  let event;
  const endpointSecret = process.env.STRIPE_SIGNITURE_KEY;
 

  if (endpointSecret) {
    // console.log('endpointSecret', endpointSecret);
    // let getBuffer = await req.body;

    try {

      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
      console.log('event', event.type === 'checkout.session.completed');

      if (event.type === 'checkout.session.completed') {
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaird = event?.data?.object?.payment_status === 'paid';
        console.log('orderId', orderId);
        const order = await Order.findById(orderId);
        console.log('order', order);
        if (order && isPaird) {
          console.log('order paid');

          //  await order.save();
          // Update the order status in your database
          const objectId = new mongoose.Types.ObjectId(orderId);
          const updatedOrder = await Order.updateOne({ _id: objectId }, { paid: true });
          console.log('updatedOrder', updatedOrder);

          //now we can empty the cart

        }



        return Response.json({ received: true });

      }


    } catch (err) {
      console.error('Error parsing webhook event:', err);
      return;
    }
  }

  return Response.json({ message: 'Webhook received successfully!' });

}