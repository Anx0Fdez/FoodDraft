"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import NutriaPrime from "../images/NutriaPRIME.png";
import { AuroraTextDemo } from "@/components/me-aurora-text";

// Define el componente 'InteractiveGridPatternDemo'
export function InteractiveGridPatternDemo() {
  return (
    // Contenedor principal que ocupa toda la pantalla y centra su contenido
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/*
      <p
        className="
          absolute // Posiciona el elemento de forma absoluta dentro de su contenedor
          top-0 // Coloca el elemento en la parte superior del contenedor
          left-0 // Coloca el elemento en la parte izquierda del contenedor
          ml-10 // Aplica un margen de 1rem (16px) en el lado izquierdo del elemento
          mt-10 // Aplica un margen de 1rem (16px) en la parte superior del elemento
          z-0 // Establece el nivel de apilamiento en 0, detrás de otros elementos con un mayor valor de z-index
          whitespace-pre-wrap // Mantiene los espacios en blanco y permite el ajuste de línea dentro del texto
          text-left // Alinea el texto a la izquierda
          text-5xl // Aplica un tamaño de fuente grande (aproximadamente 3rem)
          font-medium // Aplica un peso de fuente medio
          text-color-500 // Aplica un color de texto con una tonalidad específica (definida en el tema)
          dark:text-color-400 // Aplica un color de texto diferente cuando el modo oscuro está activado
        "
      >
        En FoodDraft, descubre, crea y comparte recetas con una comunidad apasionada por la cocina. ¡Inspírate y cocina sin límites! 🍲🔥      </p>
      */}
      <div>
        <AuroraTextDemo />
      </div>

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