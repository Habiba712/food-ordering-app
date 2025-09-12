import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectDB } from "../../../lib/mongooseConect";

import clientPromise from "../../../lib/mongooseAdapter";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    GoogleProvider({
      adapter: MongoDBAdapter(clientPromise),
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    CredentialsProvider({

      adapter: MongoDBAdapter(clientPromise),

      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gi.boj" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await connectDB();

        const user = await User.findOne({ email })
        const passwordOk = user && await bcrypt.compare(password, user.password)
        console.log('user', user)
        if (passwordOk) {
          console.log('AUTH OK, returning user...');


          return user;

        }
        return null;



      }
    })
  ],

 callbacks: {
    async jwt({ token, user, trigger, session }) {
    
        if (trigger === "update") {
             console.log('shibal session', session)
            token.name = session?.user?.name;
            token.email = session?.user?.email;
        }

        return token;
    },
    async session({ session, token }) {
        return {
            user:{                name: token.name,
                email: token.email,
            }
        }
    }
}
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }