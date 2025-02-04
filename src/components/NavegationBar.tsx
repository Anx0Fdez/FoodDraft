import React from 'react'
import { NavigationMenuDemo } from './NavegationMenu'

function NavegationBar() {
    return (
        <header className='flex items-center justify-between p-2 '>
            <nav>
                <NavigationMenuDemo />
            </nav>
        </header>
    )
}

export default NavegationBar