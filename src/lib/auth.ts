import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      userId: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      // @ts-ignore
      async authorize(credentials, request) {
        const response = await fetch(`http://localhost:3001/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const user: { message: string; token: string; userId: string } =
            await response.json();
          return { accessToken: user.token, userId: user.userId };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
