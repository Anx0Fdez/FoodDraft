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
}

export function RecipeCard(props: Post & { onDelete?: (id: number) => void; userId?: string }) {
    return <ProjectStatusCard {...props} created_at={props.created_at} user_id={props.user_id} profile_image_url={props.profile_image_url} username={props.username} />;
}

export default function Post() {
    const { userId } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const res = await fetch('/api/posts');
        if (res.ok) {
            const data = await res.json();
            setPosts(data);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeletePost = async (id: number) => {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-6xl w-full mx-auto">
            {posts.map((post) => (
                <RecipeCard key={post.id} {...post} onDelete={handleDeletePost} userId={userId || undefined} />
            ))}
        </div>
    );
}
