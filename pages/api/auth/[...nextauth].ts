import { Session, User, createClient } from "@supabase/supabase-js";
import NextAuth, { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    }
  );
};

export default NextAuth({
  pages: {
    signIn: "/auth/login" //,
    //signOut: '/auth/signout',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {}
      },
      // @ts-ignore
      async authorize(credentials) {
        const client = createSupabaseClient();
        const response = await client.auth.signInWithPassword({
          email: credentials?.username || "",
          password: credentials?.password || ""
        });

        return {
          ...response.data.session
        };
      }
    })
  ],
  callbacks: {
    // The `jwt` function is to add user properties to the HTTP cookie.
    // @ts-ignore
    async jwt({
      token,
      user: session,
      account
    }: {
      token: JWT;
      user: Session;
      account: Account;
    }) {
      // Initial sign in
      if (account && session) {
        console.log(JSON.stringify(session, null, 2));
        return {
          accessToken: session.access_token,
          accessTokenExpires: (session.expires_at || 0) * 1000,
          refreshToken: session.refresh_token,
          user: session.user
        };
      }

      return token;
    },
    // The `session` function is to add properties from the `jwt` return value to what is available in the browser session.
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    }
  },
  session: {
    maxAge: 900 // 15 mins
  }
});
