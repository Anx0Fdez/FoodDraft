'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import { RecipeCard, mockRecipeData } from './_components/RecipeCard'

export default function Page() {
    const { user } = useUser()

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <DockDemo />
            <RecipeCard {...mockRecipeData} />
        </div>
    )
}