import {NextResponse} from "next/server";

export { default as proxy } from 'next-auth/middleware';

// export function proxy(request) {
//     return NextResponse.next();
// }

export const config = {
    matcher: [
        '/dashboard/:path*'
    ]
}