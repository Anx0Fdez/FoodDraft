'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import Post from './_components/Post'
import { useAuth } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <DockDemo />
            <Post /> {/* ← Aquí se renderiza la receta */}
        </div>
    )
}
