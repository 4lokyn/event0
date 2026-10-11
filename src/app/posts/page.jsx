'use client'

import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

export default function PostsPage(){
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/api/auth/signin/credentials')
        },
    })

    return(
        <>
            { status === 'loading'
                ? <p>Loading...</p>
                : status === 'authenticated'
                    ? <p>Posts</p>
                    : <p>Not Auth</p>}
        </>
    )
}