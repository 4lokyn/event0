import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import DBconnect from "@/lib/db";
import User from "@/lib/models/user";

import {passwordCheck} from "@/utils/password";


export const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                await DBconnect();

                const user = await User.findOne({email: credentials?.email});

                if(user) {
                    const validPassword = await passwordCheck(credentials.password, user.password);

                    if(validPassword) {
                        return user
                    } else {
                        return null
                    }
                } else {
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        register: 'auth/register',
        error: '/auth/error',
    }
}