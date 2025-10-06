import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { connectDB } from "./mongooseConect";
import clientPromise from "./mongooseAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

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
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDB();

        const user = await User.findOne({ email });
        const passwordOk = user && await bcrypt.compare(password, user.password);

        if (passwordOk) {
          return user;
        }
        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.name = session?.user?.name;
        token.email = session?.user?.email;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        user: {
          name: token.name,
          email: token.email,
        }
      };
    }
  }
};
