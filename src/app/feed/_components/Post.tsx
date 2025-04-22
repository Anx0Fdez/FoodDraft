//'use client'
//
//import { ProjectStatusCard } from '@/components/ui/expandable-card'
//
//interface RecipeCardProps {
//    title: string;
//    progress: number;
//    dueDate: string;
//    contributors: Array<{ name: string; image?: string }>;
//    tasks: Array<{ title: string; completed: boolean }>;
//    githubStars: number;
//    openIssues: number;
//}
//
//export function RecipeCard(props: RecipeCardProps) {
//    return <ProjectStatusCard {...props} />
//}
//
////// Datos de ejemplo para desarrollo
////export const mockRecipeData = {
////    title: "Receta de Paella",
////    progress: 75,
////    dueDate: "2024-04-01",
////    contributors: [
////        { name: "Ana García", image: "/avatars/ana.jpg" },
////        { name: "Carlos López", image: "/avatars/carlos.jpg" },
////        { name: "María Ruiz" }
////    ],
////    tasks: [
////        { title: "Preparar ingredientes", completed: true },
////        { title: "Calentar aceite", completed: true },
////        { title: "Añadir arroz", completed: false },
////        { title: "Cocinar a fuego lento", completed: false }
////    ],
////    githubStars: 42,
////    openIssues: 3
////} 
//
//export default function post (){
//    const post = [
//        {
//            title: "Receta de Paella",
//            progress: 75,
//            dueDate: "2024-04-01",
//            contributors: [
//                { name: "Ana García", image: "/avatars/ana.jpg" },
//                { name: "Carlos López", image: "/avatars/carlos.jpg" },
//                { name: "María Ruiz" }
//            ],
//            tasks: [
//                { title: "Preparar ingredientes", completed: true },
//                { title: "Calentar aceite", completed: true },
//                { title: "Añadir arroz", completed: false },
//                { title: "Cocinar a fuego lento", completed: false }
//            ],
//            githubStars: 42,
//            openIssues: 3  
//        }
//    ]
//}
//

'use client'

import { ProjectStatusCard } from '@/components/ui/expandable-card';
import {useAuth} from "@clerk/nextjs";

/*
VIDEO MIN 10:30 //TO-DO
*/

interface Post {
    title: string;
    progress: number;
    dueDate: string;
    contributors: Array<{ name: string; image?: string }>;
    tasks: Array<{ title: string; completed: boolean }>;
    githubStars: number;
    openIssues: number;
}

export function RecipeCard(props: Post) {
    return <ProjectStatusCard {...props} />
}

// Datos de ejemplo para desarrollo
const postData: Post[] = [
    {
        title: "Receta de Paella",
        progress: 75,
        dueDate: "2024-04-01",
        contributors: [
            { name: "Ana García", image: "/avatars/ana.jpg" },
            { name: "Carlos López", image: "/avatars/carlos.jpg" },
            { name: "María Ruiz" }
        ],
        tasks: [
            { title: "Preparar ingredientes", completed: true },
            { title: "Calentar aceite", completed: true },
            { title: "Añadir arroz", completed: false },
            { title: "Cocinar a fuego lento", completed: false }
        ],
        githubStars: 42,
        openIssues: 3  
    }
]

export default function Post() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {postData.map((item, index) => (
                <RecipeCard key={index} {...item} />
            ))}
        </div>
    )
}
