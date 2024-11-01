import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/services/auth-services';
import { getIsTokenValid, getIsUserAuthorized } from './helpers/auth-helpers';
import { NextResponse } from 'next/server';


const config = {
    providers: [
        Credentials({
            async authorize(credentials) {
                const res = await login(credentials);

                if (!res.ok) {
                    console.log('login failed', await res.text());
                    return null;
                }
                const data = await res.json();
                console.log('login success', data);

                const payload = {
                    user: { ...data },
                    accessToken: data.token
                };
                return payload;
            }
        })
    ],
    callbacks: {
        // middleware in kapsama alanina giren sayfalara yapilan isteklerden hemen once calisir
        authorized({ auth, request }) {
            const { pathname, searchParams } = request.nextUrl;
            const userRole = auth?.user?.username;

            const redirectLink = searchParams.get('link');

            const isLoggedIn = !!userRole;
            const isInLoginPage = pathname.startsWith('/login');
            const isInDashboardPages = pathname.startsWith('/dashboard');
            const isTokenValid = getIsTokenValid(auth?.accessToken);

            if (isLoggedIn && isTokenValid) {
                if (isInDashboardPages) {
                    const isUserAuthorized = getIsUserAuthorized(
                        userRole,
                        pathname
                    );
                    if (isUserAuthorized) return true;

                    return NextResponse.redirect(
                        new URL('/unauthorized', request.nextUrl)
                    );
                } else if (isInLoginPage) {
                    return NextResponse.redirect(
                        new URL(redirectLink, request.nextUrl)
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
        // Kullanici cikis yaparken calisir
        async signOut({ token }) {
            // Custom logic to handle sign out
            console.log('User is logging out', token);
            // You can clear cookies, make a request to invalidate the token on the server-side, etc.
            return true;
        }
    },

    pages: {
        signIn: '/login',
        signOut: '/login'
    },
    trustHost: process.env.NODE_ENV === 'development' || [
        'localhost',
        new URL(process.env.NEXT_PUBLIC_API_URL).hostname
    ]
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
