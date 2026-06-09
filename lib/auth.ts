import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

// Module augmentation for strong typing in NextAuth v5
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      status?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    status?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    status?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
<<<<<<< HEAD
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const schema = z.object({
            email: z.string().email(),
            password: z.string()
          });
          
          const parsed = schema.safeParse(credentials);
          if (!parsed.success) return null;
          
          const user = await db.user.findUnique({
            where: { email: parsed.data.email },
            include: { membership: true }
          });
          
          if (!user) return null;
          
          const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
          if (!isValid) return null;
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.membership?.status
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
=======
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
          include: { membership: true },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!passwordsMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.membership?.status,
        };
>>>>>>> fac743c (Final release candidate polish)
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time login, 'user' is populated from authorize()
      if (user) {
        if (user?.id) token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
  },
});
