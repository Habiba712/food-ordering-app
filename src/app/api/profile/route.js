import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import User from "../../models/user.model";
import mongoose from "mongoose";
 

const connectToDatabase = async () => {

  mongoose.connect(process.env.DATABASE_URL)
  const getSession = await getServerSession(authOptions)

  return getSession;
}
 
export async function GET() {

  const session = await connectToDatabase();
  console.log('session', session)

  const email = session?.user?.email;
  
  const user = await User.findOne({ email })
console.log('user', user)
  return Response.json(user)
}


export async function PUT(req) {
  

  const body = await req.json()
  const session = await connectToDatabase();
  const email = session?.user?.email;
  const updatedUser = await User.updateOne({ email }, {
    $set:
    {
      name: body.name,
      image: body.image,
      phone: body.phone,
      street: body.street,
      country: body.country,
      city: body.city,
      postCode: body.postCode,
      admin: body.admin
    }
  })
 
  

  return Response.json(updatedUser)
}