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
  const users = await User.find()
  return Response.json(users)
}

export async function PUT(req) {
  const session = await connectToDatabase();
// http://localhost:3000/pages/users/editUser/68228fde403a1735a9b377c1

  const {id, ...data} = await req.json()
  console.log('data', data)
  
 
console.log('id', id)

// or slug[0], slug[1], etc.

  const updatedUser = await User.updateOne({ _id: id }, {
    $set:
    {
      name: data.name,
      image: data.image,
      phone: data.phone,
      street: data.street,
      country: data.country,
      city: data.city,
      postCode: data.postCode,
      admin: data.admin
    }
  })  
  return Response.json({'result': true})


}