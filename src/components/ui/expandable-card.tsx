"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MessageSquare,
  CheckCircle2,
  Trash2,
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
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
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
              className="bg-blue-100 text-blue-600"
            >
              {duration}
            </Badge>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {profile_image_url && (
              <img src={profile_image_url} alt={username || "avatar"} className="h-8 w-8 rounded-full object-cover border" />
            )}
            {user_id === currentUserId && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
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
              </TooltipProvider>
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
                      <h4 className="font-medium text-sm">Ingredientes</h4>
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

      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm gap-3 text-gray-600 flex-wrap">
          <span>
            Creado el: {created_at && !isNaN(Date.parse(created_at)) ? new Date(created_at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : 'Fecha no disponible'}
          </span>
          {width < 300 && <span>/</span>}
        </div>
      </CardFooter>
    </Card>
  );
}
