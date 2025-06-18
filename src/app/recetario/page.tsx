// Página principal del recetario. Muestra el dock y el buscador de recetas.
"use client";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { DockDemo } from "../feed/_components/InteractiveDock";
import RecipesApi from "./dictionary-api/recipes-api";
import { useAuth } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-8 p-8 min-h-screen w-full bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300 relative">
            {/* Botón para volver a la página principal */}
            <a href="/" className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-200 text-orange-900 font-semibold shadow hover:bg-orange-400 transition-colors">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Salir</span>
            </a>
            {/* Dock de navegación y buscador de recetas */}
            <div className="z-10">
                <DockDemo />
            </div>
            <RecipesApi />
        </div>
    );
}
