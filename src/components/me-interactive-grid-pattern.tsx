"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

// Define el componente 'InteractiveGridPatternDemo'
export function InteractiveGridPatternDemo() {
  return (
    // Contenedor principal que ocupa toda la pantalla y centra su contenido
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* Título centrado con estilo de texto */}
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-orange-500 dark:text-orange-300">
        Interactive Grid Pattern
      </p>
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