// Página principal del feed. Muestra la barra de navegación, el dock y la lista de recetas.
'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import Post from './_components/Post'
import { useAuth } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Page() {
    return (
            <div className="flex flex-col items-center gap-8 p-8 min-h-screen w-full bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300 relative">
            {/* Botón para volver a la página principal */}
            <a href="/" className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-200 text-orange-900 font-semibold shadow hover:bg-orange-400 transition-colors">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Salir</span>
            </a>
            {/* Barra interactiva y lista de recetas */}
            <DockDemo />
            <Post /> {/* ← Aquí se renderiza la receta */}
        </div>
    )
}
