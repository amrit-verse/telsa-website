import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

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
        /*
          Proper Credential Validation Architecture Plan:
          1. Validate 'credentials' object using Zod schema: z.object({ email: z.string().email(), password: z.string() })
          2. Query DB: const user = await db.user.findUnique({ where: { email: parsed.email }, include: { membership: true } })
          3. Check if user exists.
          4. Compare Hash: const isValid = await bcrypt.compare(parsed.password, user.passwordHash)
          5. If invalid -> return null
          6. If valid -> return { id: user.id, email: user.email, name: user.name, role: user.role, status: user.membership?.status }
        */
        return null; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time login, 'user' is populated from authorize()
      if (user) {
        token.id = user.id;
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
