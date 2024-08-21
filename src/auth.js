import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getIsTokenValid, getIsUserAuthorized } from "@/helpers/auth-helper";

import { NextResponse } from "next/server";
import { login } from "./service/auth-service";

const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await login(credentials);
        const data = await res.json();

        if (!res.ok) return null;

        const payload = {
          user: {
            ...data,
          },
          accessToken: data.token,
        };
        delete payload.user.token;

        return payload;
      },
    }),
  ],
  callbacks: {
    async authorized({ auth, request }) {
      console.log(auth);
      const { pathname } = request.nextUrl;
      const userRole = auth?.user?.role;

      const isLoggedIn = !!userRole;

      const isInLoginPage = pathname.startsWith("/adminLogin");
      const isInDashboardPages = pathname.startsWith("/dashboard");
      const isTokenValid = getIsTokenValid(auth?.accessToken);
      // console.log(isLoggedIn, isInLoginPage, isTokenValid);
      if (isLoggedIn && isTokenValid) {
        if (isInDashboardPages) {
          const isUserAuthorized = getIsUserAuthorized(userRole, pathname);
          if (isUserAuthorized) return true;

          return NextResponse.redirect(
            new URL("/unauthorized", request.nextUrl)
          );
        } else if (isInLoginPage) {
          return NextResponse.redirect(new URL("/adminMenu", request.nextUrl));
        }
      } else if (isInDashboardPages) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      return {...user, ...token}
    },
    async session({ session, token }) {
      const isTokenValid = getIsTokenValid(token.accessToken);
      if (!isTokenValid) return null;

      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/adminLogin",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

const x = {
  user: {
    user: { username: "Yonetici", role: "Admin" },
    accessToken:
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJZb25ldGljaSIsImlhdCI6MTcyNDIzNTU5NiwiZXhwIjoxNzI0MjQ0MjM2fQ.yq00IX9LmkEKwngSuyJoSqkYartkBujLYgFtprUjFAaCmYdC5JgMOf722fgGuHFk0g9fUItwT-35KPtlkcnemw",
    id: "0fcf8c43-f943-48ea-a1b3-2fe4fa0f7e06",
  },
};
