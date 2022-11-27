import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../utils/db.server";

export default NextAuth({
  callbacks: {
    async session({ session, token, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    // }),
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
});
