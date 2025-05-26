import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

export function NewPostModal({ isOpen, onClose, onPostCreated }: { isOpen: boolean; onClose: () => void; onPostCreated: (post: any) => void }) {
    const { userId } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!title.trim() || !duration.trim() || !ingredients.trim()) {
            setError('El título, duración e ingredientes son obligatorios.');
            return;
        }
        if (!userId) {
            setError('Debes iniciar sesión para crear un post.');
            return;
        }
        setError('');
        const now = new Date();
        const isoDate = now.toISOString();
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                dueDate: isoDate,
                duration,
                ingredients: ingredients.split(',').map(i => i.trim()),
                userId
            })
        });
        if (res.ok) {
            const data = await res.json();
            onPostCreated(data);
            onClose();
            setTitle(''); setDescription(''); setIngredients(''); setDuration('');
        } else {
            const err = await res.json();
            setError(err?.error || 'Error creando post');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border border-grey-300">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">Crear nueva receta</h2>
                {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => {
                        if (e.target.value.length <= 20) {
                            setTitle(e.target.value);
                            setError("");
                        } else {
                            setError("El título no puede superar los 20 caracteres.");
                        }
                    }}
                    maxLength={20}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <textarea
                    placeholder="Descripcion"
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 320) {
                            setDescription(e.target.value);
                            setError("");
                        } else {
                            setError("La descripción no puede superar los 320 caracteres.");
                        }
                    }}
                    maxLength={320}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                ></textarea>
                <input
                    type="text"
                    placeholder="Duración de la receta (ej: 45 min)"
                    value={duration}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) setDuration(e.target.value);
                    }}
                    maxLength={10}
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