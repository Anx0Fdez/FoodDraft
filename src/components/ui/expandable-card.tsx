"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Edit2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExpandable } from "@/hooks/use-expandable";
//import { UserButton, UserProfile, UserAvatar } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";

interface ProjectStatusCardProps {
  title: string;
  description: string;
  dueDate: string;
  ingredients?: string[];
  duration: string; // Nueva variable para duración
  id: number;
  created_at?: string; // Añadido campo para la fecha de creación
  onDelete?: (id: number) => void;
  user_id?: string; // Añadido campo para el ID del usuario que creó el post
  profile_image_url?: string; // Añadido campo para la URL de la imagen de perfil
  username?: string; // Añadido campo para el nombre de usuario
  likes?: number; // Añadido campo para la cantidad de likes
  dislikes?: number; // Añadido campo para la cantidad de dislikes
}

export function ProjectStatusCard({
  title,
  description,
  dueDate,
  ingredients,
  duration,
  id,
  created_at,
  onDelete,
  user_id,
  profile_image_url,
  username,
  likes,
  dislikes,
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    duration,
    ingredients: ingredients?.join(', ') || '',
  });
  const [error, setError] = useState("");
  const { user } = useUser();
  const currentUserId = user?.id;

  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card
      className="w-full max-w-full cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={toggleExpand}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-700 border border-orange-200"
            >
              {duration}
            </Badge>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <div className="flex items-center gap-0.5">
            {/* Botones de editar y eliminar solo para el dueño */}
            {user_id === currentUserId && (
              <TooltipProvider>
                {/* Botón de editar post */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditData({ title, description, duration, ingredients: ingredients?.join(', ') || '' });
                        setShowEditModal(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar post</p>
                  </TooltipContent>
                </Tooltip>
                {/* Botón de eliminar post */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-orange-800 hover:bg-orange-900 text-white border border-orange-800 transition-colors ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirm(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar post</p>
                  </TooltipContent>
                </Tooltip>
                {/* Avatar del usuario, siempre visible si existe */}
                {profile_image_url && (
                  <img src={profile_image_url} alt={username || "avatar"} className="h-8 w-8 rounded-full object-cover border ml-2" />
                )}
              </TooltipProvider>
            )}
            {/* Avatar de otros usuarios (si no es el dueño) */}
            {user_id !== currentUserId && profile_image_url && (
              <img src={profile_image_url} alt={username || "avatar"} className="h-8 w-8 rounded-full object-cover border ml-2" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <span className="mr-2 font-medium">Descripción:</span>
              <span>{description}</span>
            </div>
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-2"
                  >
                    <div className="space-y-2">
                      <h4 className="font-bold underline text-sm md:text-lg bg-gradient-to-r from-orange-400 via-orange-300 to-orange-600 bg-clip-text text-transparent mb-1">Ingredientes</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {ingredients?.map((ingredient, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600"
                          >
                            {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Discussion
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center gap-4">
            <span className="text-lg">¿Seguro que quieres eliminar este post?</span>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                  onDelete && onDelete(id);
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border border-grey-300">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Editar receta</h2>
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <input
              type="text"
              placeholder="Título"
              value={editData.title}
              maxLength={60}
              onChange={e => {
                if (e.target.value.length <= 60) {
                  setEditData({ ...editData, title: e.target.value });
                  setError("");
                } else {
                  setError("El título no puede superar los 60 caracteres.");
                }
              }}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Descripción"
              value={editData.description}
              maxLength={1500}
              onChange={e => {
                if (e.target.value.length <= 1500) {
                  setEditData({ ...editData, description: e.target.value });
                  setError("");
                } else {
                  setError("La descripción no puede superar los 1500 caracteres.");
                }
              }}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder="Duración"
              value={editData.duration}
              maxLength={8}
              onChange={e => {
                if (e.target.value.length <= 8) {
                  setEditData({ ...editData, duration: e.target.value });
                  setError("");
                } else {
                  setError("La duración no puede superar los 8 caracteres.");
                }
              }}
              className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder="Ingredientes (separados por comas)"
              value={editData.ingredients}
              onChange={e => setEditData({ ...editData, ingredients: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-orange-200 text-orange-700 rounded hover:bg-orange-300"
              >
                Cancelar
              </button>
              <button
                onClick={async e => {
                  e.stopPropagation();
                  // Lógica para actualizar el post
                  const res = await fetch(`/api/posts/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      title: editData.title,
                      description: editData.description,
                      duration: editData.duration,
                      ingredients: editData.ingredients.split(',').map(i => i.trim()),
                    })
                  });
                  if (res.ok) {
                    setShowEditModal(false);
                    window.location.reload();
                  } else {
                    const err = await res.json();
                    setError(err?.error || 'Error actualizando post');
                  }
                }}
                className="px-4 py-2 bg-orange-800 text-white rounded hover:bg-orange-900"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm gap-3 text-gray-600 flex-wrap">
            <span>
              Creado el: {created_at && !isNaN(Date.parse(created_at)) ? new Date(created_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : 'Fecha no disponible'}
            </span>
            {width < 300 && <span>/</span>}
          </div>
          <div className="flex flex-col items-center gap-1 mr-2">
            <button
              className="p-0 border-none bg-transparent text-orange-800 hover:text-orange-600 transition-colors"
              onClick={async (e) => {
                e.stopPropagation();
                if (!currentUserId) return;
                await fetch(`/api/posts/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId: currentUserId, vote: 1 })
                });
                window.location.reload();
              }}
              aria-label="Like"
            >
              {/* Flecha hacia arriba */}
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6l6 6H6z"/></svg>
            </button>
            <span className="font-semibold select-none text-orange-400">{(likes || 0) - (dislikes || 0)}</span>
            <button
              className="p-0 border-none bg-transparent text-orange-800 hover:text-orange-600 transition-colors"
              onClick={async (e) => {
                e.stopPropagation();
                if (!currentUserId) return;
                await fetch(`/api/posts/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId: currentUserId, vote: -1 })
                });
                window.location.reload();
              }}
              aria-label="Dislike"
            >
              {/* Flecha hacia abajo */}
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 18l6-6H6z"/></svg>
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
