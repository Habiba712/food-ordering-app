import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import User from "../../models/user.model";
import Order from "../../models/order.model";


const connectToDatabase = async () => {

  mongoose.connect(process.env.DATABASE_URL)
  const getSession = await getServerSession(authOptions)
  return getSession;
}

export async function GET(req) {

  const session = await connectToDatabase();
  console.log('session', session)

  const email = session?.user?.email;
  const user = await User.findOne({ email })
  const newURL = new URL(req.url)
  const id = newURL.searchParams.get('id');


  //get all orders only for admin
  if (user.admin === true) {
    const getOrders = await Order.find({ 'userEmail': email })
    console.log('data order', getOrders)
    return Response.json(getOrders)
  }
  //get specific order for normal user

  if (id) {
 const order = await Order.find({ '_id': id })
  console.log('order', order)

    return Response.json(order)
    // return Response.json(await Order.find({ userName: user.name }));
  }
  // get all orders for normal user
  else {
    const getOrders = await Order.find({ 'userEmail': email })
    console.log('data order', getOrders)
    return Response.json(getOrders)
  }

 


}

