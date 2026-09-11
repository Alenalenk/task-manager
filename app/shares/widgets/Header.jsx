'use client'
import { Navbar, NavbarBrand } from "flowbite-react"
import Link from "next/link"
import { LogoutForm } from "@/features/auth/components/LogoutForm"
import { usePathname } from "next/navigation"

export const Header = () => {
    const pathname = usePathname();

    const isAuthPages = pathname.includes("/auth/");

    return (
        <header className="fixed w-full z-20 top-0 start-0">
            <Navbar fluid rounded>
                <NavbarBrand as={Link} href="/">
                    <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Task Tracker</span>
                </NavbarBrand>
                {!isAuthPages && (
                    <LogoutForm />
                )}
            </Navbar>
        </header>
    )
}