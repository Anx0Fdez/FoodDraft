"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import NutriaPrime from "../images/NutriaPRIME.png";

// Define el componente 'InteractiveGridPatternDemo'
export function InteractiveGridPatternDemo() {
  return (
    // Contenedor principal que ocupa toda la pantalla y centra su contenido
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* Título centrado con estilo de texto */}
      <p className="absolute top-0 left-0 m-4 z-0 whitespace-pre-wrap text-left text-3xl font-medium text-color-500 dark:text-color-400" >
        FoodDraft
      </p>

      {/* Imagen portada */}
      <div className="flex flex-col items-center justify-center z-10 w-60 h-60 sm:w-80 sm:h-80 md:w-100 md:h-100 lg:w-[40rem] lg:h-[40rem] pointer-events-none lg:ml-auto lg:mr-4 lg:mt-[-6rem] md:mt-[-4rem] sm:mt-[-2rem] mt-[-1rem]"> 
        <img src={NutriaPrime.src} alt="NutriaPRIME" className="mt-4" />
      </div>

      {/* Componente de patrón de cuadrícula interactivo */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]", // Gradiente radial para el difuminado
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12", // Posicionamiento y transformación del componente
        )}
      />
    </div>
  );
}