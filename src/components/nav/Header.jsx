'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {Button, Dropdown, Header as SectionHeader, Label, Separator} from "@heroui/react";
import {signOut, useSession} from "next-auth/react";


export default function Header() {
    const {data: session } = useSession();
    const pathname = usePathname();

    const onSignOutUser =  async () => {
        await signOut({callbackUrl: '/'})
    }

    // if (pathname.startsWith('/auth')) return null;

    return(
        <nav className={`sticky top-0 z-40 w-full border-b border-b-border bg-surface/80 shadow-sm backdrop-blur-lg transition-transform duration-300`}>
            <header className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
                <Link href='/' className='font-anton text-2xl tracking-wide text-accent transition-opacity hover:opacity-80'>
                    Event0
                </Link>

                <Dropdown>
                    <Button aria-label="Menu" variant="tertiary" size="sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Menu
                    </Button>
                    <Dropdown.Popover placement='bottom end' className="min-w-44">
                        <Dropdown.Menu aria-label="Menu action">

                            <>
                                { session
                                    ?
                                    <Dropdown.Section>
                                        <SectionHeader>Admin actions</SectionHeader>

                                        <Dropdown.Item id="home" href="/" textValue="Home">
                                            <Label>Home</Label>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="addEvent" href="/dashboard/add_event" textValue="Add Event">
                                            <Label>Add Event</Label>
                                        </Dropdown.Item>

                                        <Dropdown.Item id="addVenue" href="/dashboard/add_venue" textValue="Add Venue">
                                            <Label>Add Venue</Label>
                                        </Dropdown.Item>

                                        <Separator />

                                        <Dropdown.Item id="logout" textValue="Logout" variant="danger" onPress={onSignOutUser}>
                                            <Label>Logout</Label>
                                        </Dropdown.Item>

                                    </Dropdown.Section>
                                    :
                                        <Dropdown.Section>
                                            <Dropdown.Item id="register" href="/auth/register" textValue="Register">
                                                <Label>Register</Label>
                                            </Dropdown.Item>

                                            <Dropdown.Item id="signin" href="/auth/signin" textValue="SignIn">
                                                <Label>SignIn</Label>
                                            </Dropdown.Item>
                                        </Dropdown.Section>

                                }
                            </>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </header>
        </nav>
    )
}
