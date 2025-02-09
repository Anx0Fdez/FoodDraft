import React from 'react'
import { NavigationMenuDemo } from './NavegationMenu'
import Link from "next/link"
import Logo from "../images/Logo.png";
import Image from 'next/image'
import { Button } from './ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

function NavegationBar() {
    return (
        <header className='flex items-center justify-between p-2 '>
            <nav className='flex items-center w-full mx-10'>
                <div className='flex items-center justify-center'>
                    <Link href="/">
                        <Image
                            priority
                            src={Logo.src}
                            alt="Logotipo nutria representativa de FoodDraft"
                            width={50}
                            height={50}
                            className=""
                        />
                    </Link>
                </div>
                <div className='flex items-center justify-center'>
                    <NavigationMenuDemo />
                </div>
                <div className='flex w-full justify-end gap-5'>
                    <SignInButton>
                        <Button variant="default" className="bg-orange-500">Iniciar Sesión</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="default" className="bg-orange-500">Registrarse</Button>
                    </SignUpButton>
                </div>
            </nav>
        </header>
    )
}

export default NavegationBar