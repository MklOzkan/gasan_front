import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getIsTokenValid, getIsUserAuthorized } from "./helpers/auth-helper";
import { login } from "./service/auth-service";
import { NextResponse } from 'next/server';

const config = {
	providers: [
		Credentials({
			async authorize(credentials) {
				const res = await login(credentials);
				const data = await res.json();
				if (!res.ok) return null;

				const payload = {
					user: { ...data }
				};
			
				console.log(payload);
				return payload;
			},
		}),
	],
	callbacks: {
		authorized({ auth, request }) {
			const { pathname } = request.nextUrl;
			const userRole = auth?.user?.role;

			const isLoggedIn = !!userRole;
			const isInLoginPage = pathname.startsWith("/adminLogin");
			const isInDashboardPages = pathname.startsWith("/dashboard");
			const isTokenValid = getIsTokenValid(auth?.token);

			if (isLoggedIn && isTokenValid) {
				if (isInDashboardPages) {
					const isUserAuthorized = getIsUserAuthorized(
						userRole,
						pathname
					);
					if (isUserAuthorized) return true;

					return NextResponse.redirect(
						new URL("/unauthorized", request.nextUrl)
					);
				} else if (isInLoginPage) {
					return NextResponse.redirect(
						new URL("/adminMenu", request.nextUrl)
					);
				}
			} else if (isInDashboardPages) {
				return false;
			}

			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user.user;
				token.accessToken = user.token;
			}
			return token;
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
		signIn: "/",
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

