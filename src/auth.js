import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getIsTokenValid, getIsUserAuthorized } from "./helpers/auth-helper";
import { login } from "./service/auth-service";

const config = {
	providers: [
		Credentials({
			async authorize(credentials) {
				const res = await login(credentials);
				const data = await res.json();
				if (!res.ok) return null;

				const payload = {
					user: { ...data },
					accessToken: data.token.split(" ")[1],
				};
				delete payload.user.token;

				return payload;
			},
		}),
	],
	callbacks: {
		// middleware in kapsama alanina giren sayfalara yapilan isteklerden hemen once calisir
		authorized({ auth, request }) {
			const { pathname } = request.nextUrl;
			const userRole = auth?.user?.role;

			const isLoggedIn = !!userRole;
			const isInLoginPage = pathname.startsWith("/login");
			const isInDashboardPages = pathname.startsWith("/dashboard");
			const isTokenValid = getIsTokenValid(auth?.accessToken);

			if (isLoggedIn && isTokenValid) {
				if (isInDashboardPages) {
					const isUserAuthorized = getIsUserAuthorized(
						userRole,
						pathname
					);
					if (isUserAuthorized) return true;

					return Response.redirect(
						new URL("/unauthorized", request.nextUrl)
					);

					
				} else if (isInLoginPage) {
					return Response.redirect(
						new URL("/dashboard", request.nextUrl)
					);
				}
			} else if (isInDashboardPages) {
				return false;
			}

			return true;
		},
		// JWT datasina ihtiyac duyan her yerde
		async jwt({ token, user }) {
			//console.log("JWT", token, user);
			return { ...user, ...token };
		},
		// Session datasina ihtiyac duyan her yerde
		async session({ session, token }) {
			const isTokenValid = getIsTokenValid(token.accessToken);
			if (!isTokenValid) return null;

			session.accessToken = token.accessToken;
			session.user = token.user;
			return session;
		},
	},

	pages: {
		signIn: "/login",
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
