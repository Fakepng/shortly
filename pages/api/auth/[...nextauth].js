import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        // GithubProvider({
        //     clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
        //     clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
        // }),
        // GoogleProvider({
        //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        // }),
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
})