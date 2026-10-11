'use client'

import {RouterProvider} from "@heroui/react";
import {useRouter} from "next/navigation";

// Makes HeroUI links (Dropdown.Item href, Link, ...) use Next's client-side navigation
export default function NavigationProvider({ children }) {
    const router = useRouter();

    return (
        <RouterProvider navigate={router.push}>
            {children}
        </RouterProvider>
    );
}
