'use client'

import Link from "next/link";
import { Alert, Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { z } from 'zod';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {registerUser} from "@/app/auth/register/actions";
import {useRouter} from "next/navigation";
import {showToast} from "@/utils/toast";

const schema = z.object({
    email: z.email(),
    password: z.string().min(8, 'Password needs to be at least 8 characters long'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export default function RegisterForm() {
    const router = useRouter();
    const [isPending, setTransition] = useTransition();
    const [serverError, setServerError] = useState(null);

    const {control, handleSubmit, reset, formState: { error }} = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const handleRegisterSubmit = async (payload) => {
        await handleApiSubmitForm(payload);
    }

    const handleApiSubmitForm = async (payload) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const user = await res.json();

        if(!res.ok) {
            showToast({
                title: 'Registration failed',
                description: user.error ?? 'Something went wrong',
                variant: 'danger',
            })
            return;
        }

        showToast({
            title: 'Account created',
            description: 'You can now sign in',
            variant: 'success',
        })
        reset();
        router.push('/auth/signin');
    }

    return (
        <>
            {/*{serverError && (*/}
            {/*    <Alert status="danger" className="mb-4">*/}
            {/*        <Alert.Indicator />*/}
            {/*        <Alert.Content>*/}
            {/*            <Alert.Title>{serverError?.title}</Alert.Title>*/}
            {/*            <Alert.Description>{serverError?.message}</Alert.Description>*/}
            {/*        </Alert.Content>*/}
            {/*    </Alert>*/}
            {/*)}*/}


            <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                <h1 className="mb-5 text-2xl font-semibold text-foreground">Create account</h1>

                <Form onSubmit={handleSubmit(handleRegisterSubmit)} className="flex flex-col gap-4">
                    <Controller name='email' control={control} render={({field, fieldState}) => (
                        <TextField {...field} isInvalid={fieldState.invalid}>
                            <Label>Email</Label>
                            <Input placeholder="example@mail.com" />
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </TextField>
                    )} />

                    <Controller control={control} name='password' render={({field, fieldState}) => (
                        <TextField  {...field} isInvalid={fieldState.invalid} type='password'>
                            <Label>Password</Label>
                            <Input placeholder="At least 8 characters" />
                            <Description>Passwords must be at least 8 characters.</Description>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </TextField>
                    )}/>

                    <Controller control={control} name='confirmPassword' render={({field, fieldState}) => (
                        <TextField  {...field} isInvalid={fieldState.invalid} type='password'>
                            <Label>Re-enter password</Label>
                            <Input placeholder="••••••••" />
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </TextField>
                    )}/>

                    <Button isDisabled={isPending} isPending={isPending} type="submit" fullWidth className="mt-1">
                        Create your Event0 account
                    </Button>
                </Form>

                <p className="mt-5 text-xs leading-relaxed text-muted">
                    By creating an account, you agree to Event0&apos;s <Link href='/' className="text-accent hover:underline">Terms of Use</Link> and <Link href='/' className="text-accent hover:underline">Privacy Notice</Link>.
                </p>
            </section>

            <div className="my-6 flex items-center gap-3 text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                Already have an account?
                <span className="h-px flex-1 bg-border" />
            </div>

            <Link
                href='/auth/signin'
                className="block w-full rounded-full border border-border bg-surface py-2 text-center text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-default"
            >
                Sign in
            </Link>
        </>
    )
}
