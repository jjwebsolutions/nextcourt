import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "~/server/db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session {
    id: string;
    role: string;
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        // modify token
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.role = token.role;
      return session;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });
        if (user) {
          if (credentials?.password && user.password) {
            const match: any = await bcrypt.compare(
              credentials?.password,
              user.password
            );
            if (match === true) {
              return user;
            } else {
              return null;
            }
          }
        }
        return null;

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // If no error and we have user data, return it

        // Return null if user data could not be retrieved
      },
    }),
  ],
  pages: {
    signIn: "../../auth/signin",
    error: "../../auth/error",
    verifyRequest: "verify-request",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
