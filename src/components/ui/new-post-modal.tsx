import { useState } from 'react';

export function NewPostModal({ isOpen, onClose, onPostCreated }: { isOpen: boolean; onClose: () => void; onPostCreated: (post: any) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [tasks, setTasks] = useState(''); // Opcional: para tareas
    const [duration, setDuration] = useState(''); // Nueva variable para duración
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const now = new Date();
        const isoDate = now.toISOString();
        if (!title.trim() || !duration.trim()) {
            setError('El nombre y el tiempo de duración son obligatorios.');
            return;
        }
        setError('');
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                dueDate: isoDate,
                duration, // Enviar duración
                tasks: tasks ? JSON.parse(tasks) : [], // Si quieres permitir tareas
                ingredients: ingredients.split(',').map(i => i.trim())
            })
        });
        if (res.ok) {
            const data = await res.json();
            onPostCreated(data);
            onClose();
        } else {
            setError('Error creando post');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-grey-300">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">Crear nueva receta</h2>
                {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
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
                    type="text"
                    placeholder="Duración de la receta (ej: 45 min)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {/*
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                */}
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