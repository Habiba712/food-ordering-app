import User from "../../models/user.model"
import mongoose from "mongoose"
import bcrypt from 'bcryptjs';


export async function POST(req) {
  //* before creatig a user in the database we need to connect to the database
  const body = await req.json()
  mongoose.connect(process.env.DATABASE_URL)

  const pass = body.password
  if (!pass.length || pass.length < 5) {
    throw new Error("Password must be at least 5 characters long");
  }

  const notHashedPass = pass;
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(notHashedPass, salt);

  body.password = hashedPass

  const user = new User({ email: body.email, password: body.password })
  const savedUser = await user.save()

  return Response.json(savedUser)
}