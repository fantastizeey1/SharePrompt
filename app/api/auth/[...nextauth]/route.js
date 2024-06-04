import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        }).lean();
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        } else {
          throw new Error("User not found");
        }
        return session;
      } catch (error) {
        console.error("Error in session callback: ", error.message);
        throw new Error("Error retrieving session");
      }
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email }).lean();

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
