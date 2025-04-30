import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export function NewPostModal({ isOpen, onClose, onPostCreated }: { isOpen: boolean; onClose: () => void; onPostCreated: (post: any) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleSubmit = async () => {
        const { data, error } = await supabase
            .from('post')
            .insert([{ title, description, due_date: dueDate, ingredients: ingredients.split(',') }]);

        if (error) {
            console.error('Error creating post:', error);
        } else if (data) {
            onPostCreated(data[0]);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-grey-300">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">Crear nueva receta</h2>
                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <textarea
                    placeholder="Descripcion"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                ></textarea>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    type="text"
                    placeholder="Ingredientes (separados-comas)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-orange-200 orange-orange-700 rounded hover:bg-orange-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-orange-800 text-white rounded hover:bg-orange-900">Create</button>
                </div>
            </div>
        </div>
    );
}