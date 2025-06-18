// Este archivo define la tarjeta de receta y la lógica para mostrar y filtrar publicaciones (recetas).
'use client'

import { ProjectStatusCard } from '@/components/ui/expandable-card';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

// Interfaz que representa la estructura de un post/receta
interface Post {
    id: number;
    title: string;
    description: string; // Descripción de la receta
    dueDate: string;
    tasks: Array<{ title: string; completed: boolean }>;
    ingredients?: string[]; // Ingredientes opcionales
    duration: string; // Duración de la receta
    created_at?: string; // Fecha de creación
    user_id?: string; // ID del usuario creador
    profile_image_url?: string; // Imagen de perfil del usuario
    username?: string; // Nombre de usuario
    likes?: number; // Número de likes
    dislikes?: number; // Número de dislikes
}

// Componente que renderiza una tarjeta de receta usando ProjectStatusCard
export function RecipeCard(props: Post & { onDelete?: (id: number) => void; userId?: string }) {
    return <ProjectStatusCard {...props} created_at={props.created_at} user_id={props.user_id} profile_image_url={props.profile_image_url} username={props.username} />;
}

// Opciones de orden para filtrar las recetas
const ORDER_OPTIONS = [
    { value: "popular", label: "Más likes" },
    { value: "dislikes", label: "Más dislikes" },
    { value: "recent", label: "Más reciente" },
    { value: "oldest", label: "Más antiguo" },
];

// Componente principal que muestra la lista de recetas y permite filtrar/buscar
export default function Post() {
    const { userId } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]); // Estado para las recetas
    const [order, setOrder] = useState("popular"); // Estado para el orden
    const [search, setSearch] = useState(""); // Estado para la búsqueda

    // Función para obtener las recetas desde la API
    const fetchPosts = async (orderBy = order) => {
        const res = await fetch(`/api/posts?order=${orderBy}`);
        if (res.ok) {
            const data = await res.json();
            setPosts(data);
        }
    };

    // Efecto para cargar las recetas cuando cambia el orden
    useEffect(() => {
        fetchPosts(order);
    }, [order]);

    // Elimina una receta por su id
    const handleDeletePost = async (id: number) => {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
    };

    // Filtra las recetas por el texto de búsqueda
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="flex flex-col gap-6 p-6 max-w-6xl w-full mx-auto">
            {/* Barra de filtros y búsqueda */}
            <div className="flex items-center mb-3 gap-4">
                <label className="mr-3 text-base font-semibold text-orange-700">Ordenar por:</label>
                <select
                    className="border border-orange-300 rounded-lg px-5 py-2 text-base bg-orange-50 text-orange-800 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors hover:bg-orange-100 focus:bg-orange-100 min-w-[200px]"
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                    style={{ fontWeight: 600 }}
                >
                    {ORDER_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Buscar receta por nombre..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-4 py-2 border border-orange-300 rounded-lg text-base bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 flex-1 min-w-0"
                />
            </div>
            {/* Renderiza las recetas filtradas */}
            {filteredPosts.map((post) => (
                <RecipeCard key={post.id} {...post} onDelete={handleDeletePost} userId={userId || undefined} />
            ))}
        </div>
    );
}
