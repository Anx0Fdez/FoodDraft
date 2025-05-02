'use client'

import { ProjectStatusCard } from '@/components/ui/expandable-card';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Cambiado para usar las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

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

export default function Post() {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const { data, error } = await supabase.from('post').select('*');
        if (!error && data) {
            setPosts(data);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleNewPost = (newPost: Post) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            {posts.map((post, index) => (
                <RecipeCard key={index} {...post} />
            ))}
        </div>
    );
}
