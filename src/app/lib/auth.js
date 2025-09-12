// lib/auth.js
import NextAuth, { getServerSession } from "next-auth";
 
export function getAuthSession() {
  return getServerSession(NextAuth);
}
