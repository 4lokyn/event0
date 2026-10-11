'use client'

import Link from "next/link";
import { Alert, Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {showToast} from "@/utils/toast";

export default function SignInForm() {
    const [error, setError] = useState();
    const router = useRouter();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

        if (res?.error) {
            showToast({
                title: 'Sign in failed',
                description: 'Invalid email or password',
                variant: 'danger',
            })
            return;
        }

        showToast({
            title: 'Welcome back!',
            description: 'You are signed in',
            variant: 'success',
        })
        router.push('/');
    }

    return (
        <>
            <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                <h1 className="mb-5 text-2xl font-semibold text-foreground">Sign in</h1>

                <Form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <TextField name="email" type="email" isRequired fullWidth autoComplete="email">
                        <Label>Email</Label>
                        <Input placeholder="you@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField name="password" type="password" isRequired fullWidth autoComplete="current-password">
                        <Label>Password</Label>
                        <Input placeholder="Enter your password here" />
                        <FieldError />
                    </TextField>

                    <Button type="submit" fullWidth className="mt-1">
                        Continue
                    </Button>
                </Form>

                <div className="my-5 flex items-center gap-3 text-xs text-muted">
                    <span className="h-px flex-1 bg-border" />
                    or
                    <span className="h-px flex-1 bg-border" />
                </div>

                <Button
                    variant="outline"
                    fullWidth
                    onPress={() => signIn('github', { callbackUrl: '/dashboard' })}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    Continue with GitHub
                </Button>

                <p className="mt-5 text-xs leading-relaxed text-muted">
                    By continuing, you agree to Event0&apos;s <Link href='/' className="text-accent hover:underline">Terms of Use</Link> and <Link href='/' className="text-accent hover:underline">Privacy Notice</Link>.
                </p>
            </section>

            <div className="my-6 flex items-center gap-3 text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                New to Event0?
                <span className="h-px flex-1 bg-border" />
            </div>

            <Link
                href='/auth/register'
                className="block w-full rounded-full border border-border bg-surface py-2 text-center text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-default"
            >
                Create your Event0 account
            </Link>
        </>
    )
}
