import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "operator@spacepoint.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Attempt to connect to the database (This WILL work on Vercel)
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          // Seed the user automatically on first login if it doesn't exist
          if (!user && credentials.email === "operator@spacepoint.com") {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: "SpacePoint Operator",
                password: hashedPassword,
                portfolio: {
                  create: {
                    username: "operator",
                    aboutText: "A multidisciplinary 3rd‑year Computer Science student...",
                    missionLog: "My engineering portfolio highlights practical deployments...",
                    themePrimaryColor: "#ff3333",
                  }
                }
              }
            });
          }

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) return null;

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          // Fallback for local IPv4 networking timeouts
          console.error("Database connection failed, using local mock auth...");
          if (
            credentials.email === "operator@spacepoint.com" &&
            credentials.password === "password123"
          ) {
            return {
              id: "mock-id-123",
              email: "operator@spacepoint.com",
              name: "SpacePoint Operator",
            };
          }
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
