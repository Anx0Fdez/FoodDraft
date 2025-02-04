"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import NutriaPrime from "../images/NutriaPRIME.png";
import { AuroraTextDemo } from "@/components/me-aurora-text";
import Image from "next/image";
import { InteractiveHoverButtonDemo } from "./me-interactive-hover-button";

// Define el componente 'InteractiveGridPatternDemo'
export function InteractiveGridPatternDemo() {
  return (
    // Contenedor principal que ocupa toda la pantalla y centra su contenido
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">

      <div className="
          absolute // Posiciona el elemento de forma absoluta dentro de su contenedor
          top-0 // Coloca el elemento en la parte superior del contenedor
          left-0 // Coloca el elemento en la parte izquierda del contenedor
          ml-10 // Aplica un margen de 1rem (16px) en el lado izquierdo del elemento
          mt-10 // Aplica un margen de 1rem (16px) en la parte superior del elemento
          mr-20 // Aplica un margen de 1rem (16px) en el lado derecho del elemento
          lg:mr-40 // Aplica un margen de 1.25rem (20px) en el lado derecho del elemento en pantallas grandes
          xl:mr-80 // Aplica un margen de 2.5rem (40px) en el lado derecho del elemento en pantallas extra grandes
          whitespace-pre-wrap // Mantiene los espacios en blanco y permite el ajuste de línea dentro del texto
          text-left // Alinea el texto a la izquierda
        "
      >
        <AuroraTextDemo />
      </div>

      {/* Imagen portada */}
      <div className="flex flex-col items-center justify-center z-10 w-60 h-60 sm:w-80 sm:h-80 md:w-100 md:h-100 lg:w-[40rem] lg:h-[40rem] pointer-events-none lg:ml-auto lg:mr-4 lg:mt-[-1rem] md:mt-[-1.5rem] sm:mt-[-2rem] mt-[-3rem]">
        <Image
          src={NutriaPrime.src}
          alt="NutriaPRIME"
          className="mt-4" 
          width={1024}
          height={1024}
          />
      </div>

      <div 
        className="
          flex // Establece el contenedor como un contenedor flexible
          flex-col // Organiza los elementos en una columna vertical
          items-start // Alinea los elementos al inicio horizontalmente en el contenedor
          justify-start // Alinea los elementos al inicio verticalmente en el contenedor
          z-10 // Establece el índice z para controlar la superposición de elementos
          w-40 // Ancho base de 10rem (160px)
          h-40 // Altura base de 10rem (160px)
          sm:w-60 // Ancho de 15rem (240px) en pantallas pequeñas
          sm:h-60 // Altura de 15rem (240px) en pantallas pequeñas
          md:w-80 // Ancho de 20rem (320px) en pantallas medianas
          md:h-80 // Altura de 20rem (320px) en pantallas medianas
          lg:w-[30rem] // Ancho de 30rem (480px) en pantallas grandes
          lg:h-[30rem] // Altura de 30rem (480px) en pantallas grandes
          lg:ml-10 // Margen izquierdo de 2.5rem (40px) en pantallas grandes
          lg:mr-auto // Margen derecho automático en pantallas grandes
          lg:mt-[-8rem] // Margen superior negativo de 8rem (128px) en pantallas grandes
          md:mt-[-6rem] // Margen superior negativo de 6rem (96px) en pantallas medianas
          sm:mt-[-5rem] // Margen superior negativo de 5rem (80px) en pantallas pequeñas
          mt-[-4rem] // Margen superior negativo base de 4rem (64px)
        "
      >
        <InteractiveHoverButtonDemo />
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