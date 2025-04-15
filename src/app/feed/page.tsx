'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import { User } from 'lucide-react'
import { RecipeCard } from '@/components/ui/expandable-card'

export default function Page() {
    const { user } = useUser()
    
    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex justify-center">
                <RecipeCard 
                    title="Paella Valenciana"
                    description="La paella valenciana es un plato tradicional de la Comunidad Valenciana que combina arroz con verduras, carnes y especias, cocinado en una paellera sobre fuego de leñapaella valenciana es un plato tradicional de la Comunidad Valenciana que combina arroz con verduras, carnes y especias, cocinado en una paellera sobre fupaella valenciana es un plato tradicional de la Comunidad Valenciana que combina arroz con verduras, carnes y especias, cocinado en una paellera sobre fu."
                    cookingTime="45 minutos"
                    difficulty="Media"
                    ingredients={[
                        { name: "Arroz bomba", amount: "400g" },
                        { name: "Pollo", amount: "300g" },
                        { name: "Conejo", amount: "300g" },
                        { name: "Judías verdes", amount: "200g" },
                        { name: "Garrofó", amount: "100g" },
                        { name: "Tomate rallado", amount: "200g" },
                        { name: "Azafrán", amount: "1 pizca" },
                        { name: "Aceite de oliva", amount: "100ml" },
                        { name: "Sal", amount: "al gusto" }
                    ]}
                    steps={[
                        { description: "Cortar las carnes en trozos y dorarlas en la paellera con aceite", completed: true },
                        { description: "Añadir las verduras y sofreír", completed: true },
                        { description: "Incorporar el tomate y cocinar hasta que se evapore el agua", completed: false },
                        { description: "Añadir el agua caliente y el azafrán", completed: false },
                        { description: "Cuando hierva, añadir el arroz y cocinar a fuego medio", completed: false }
                    ]}
                    author={user?.username || "Usuario"}
                    imageUrl="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop"
                />
            </div>

            <div className="flex justify-center">
                <DockDemo />
            </div>
        </div>
    )
}