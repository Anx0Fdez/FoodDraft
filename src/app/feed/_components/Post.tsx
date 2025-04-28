'use client'

import { ProjectStatusCard } from '@/components/ui/expandable-card';
import {useAuth} from "@clerk/nextjs";

/*
VIDEO MIN 10:30 //TO-DO
*/

interface Post {
    title: string;
    description: string; // Added description field
    dueDate: string;
    tasks: Array<{ title: string; completed: boolean }>;
    ingredients?: string[]; // Added optional ingredients field
}

export function RecipeCard(props: Post) {
    return <ProjectStatusCard {...props} />;
}

// Datos de ejemplo para desarrollo
const postData: Post[] = [
    {
        title: "Receta de Paella",
        description: "Una deliciosa receta de paella con mariscos.",
        dueDate: "2024-04-01",
        tasks: [
            { title: "Preparar ingredientes", completed: true },
            { title: "Calentar aceite", completed: true },
            { title: "Añadir arroz", completed: false },
            { title: "Cocinar a fuego lento", completed: false }
        ],
        ingredients: ["Arroz 300gr", "Langostinos 200gr", "Azafrán 5gr", "Caldo de pescado 500ml", "Pimiento rojo 1", "Guisantes 100gr", "Aceite de oliva 50ml" , "Sal al gusto"]
    }
];

export default function Post() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {postData.map((item, index) => (
                <RecipeCard key={index} {...item} />
            ))}
        </div>
    );
}
