'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import Post from './_components/Post' // ← Importa el nuevo componente

export default function Page() {
    const { user } = useUser()

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <DockDemo />
            <Post /> {/* ← Aquí se renderiza la receta */}
        </div>
    )
}
