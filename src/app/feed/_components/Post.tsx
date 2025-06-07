'use client'

import { ProjectStatusCard } from '@/components/ui/expandable-card';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

// Eliminado Supabase

/*
VIDEO MIN 10:30 //TO-DO
*/

interface Post {
    id: number;
    title: string;
    description: string; // Added description field
    dueDate: string;
    tasks: Array<{ title: string; completed: boolean }>;
    ingredients?: string[]; // Added optional ingredients field
    duration: string; // Nueva variable para duración
    created_at?: string; // Añadido campo para la fecha de creación
    user_id?: string; // Added user_id field
    profile_image_url?: string; // Added profile_image_url field
    username?: string; // Added username field
    likes?: number; // Added likes field
    dislikes?: number; // Added dislikes field
}

export function RecipeCard(props: Post & { onDelete?: (id: number) => void; userId?: string }) {
    return <ProjectStatusCard {...props} created_at={props.created_at} user_id={props.user_id} profile_image_url={props.profile_image_url} username={props.username} />;
}

const ORDER_OPTIONS = [
    { value: "popular", label: "Más likes" },
    { value: "dislikes", label: "Más dislikes" },
    { value: "recent", label: "Más reciente" },
    { value: "oldest", label: "Más antiguo" },
];

export default function Post() {
    const { userId } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [order, setOrder] = useState("popular");
    const [search, setSearch] = useState("");

    const fetchPosts = async (orderBy = order) => {
        const res = await fetch(`/api/posts?order=${orderBy}`);
        if (res.ok) {
            const data = await res.json();
            setPosts(data);
        }
    };

    useEffect(() => {
        fetchPosts(order);
    }, [order]);

    const handleDeletePost = async (id: number) => {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
    };

    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className="flex flex-col gap-6 p-6 max-w-6xl w-full mx-auto">
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
            {filteredPosts.map((post) => (
                <RecipeCard key={post.id} {...post} onDelete={handleDeletePost} userId={userId || undefined} />
            ))}
        </div>
    );
}
