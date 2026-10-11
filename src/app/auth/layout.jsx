import Link from "next/link";
import {getServerSession} from "next-auth";
import {options} from "@/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function AuthLayout({ children }) {
    const serverSession = await getServerSession(options);

    if(serverSession) {
        redirect('/dashboard')
    }

    return (
        <main className="flex flex-1 flex-col items-center bg-background px-4 py-10">
            <Link href='/' className='font-anton mb-6 text-4xl tracking-wide text-accent transition-opacity hover:opacity-80'>
                Event0
            </Link>

            <div className="w-full max-w-sm">
                {children}
            </div>

            <footer className="mt-auto w-full max-w-sm border-t border-border pt-6 text-center text-xs text-muted">
                © {new Date().getFullYear()} Event0
            </footer>
        </main>
    )
}
