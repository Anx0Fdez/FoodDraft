// Importa la función 'cn' desde la biblioteca de utilidades y React junto con el hook useState
import { cn } from "@/lib/utils";
import React, { useState } from "react";

// Define la interfaz de las propiedades del componente InteractiveGridPattern
/**
 * InteractiveGridPattern es un componente que renderiza un patrón de cuadrícula con cuadrados interactivos.
 *
 * @param width - El ancho de cada cuadrado.
 * @param height - La altura de cada cuadrado.
 * @param squares - El número de cuadrados en la cuadrícula. El primer elemento es el número de cuadrados horizontales y el segundo elemento es el número de cuadrados verticales.
 * @param className - El nombre de la clase de la cuadrícula.
 * @param squaresClassName - El nombre de la clase de los cuadrados.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number; // Ancho opcional de cada cuadrado
  height?: number; // Altura opcional de cada cuadrado
  squares?: [number, number]; // [horizontal, vertical] - Número de cuadrados en la cuadrícula
  className?: string; // Nombre de la clase opcional para la cuadrícula
  squaresClassName?: string; // Nombre de la clase opcional para los cuadrados
}

// Define el componente InteractiveGridPattern
/**
 * El componente InteractiveGridPattern.
 *
 * @see InteractiveGridPatternProps para la interfaz de las propiedades.
 * @returns Un componente de React.
 */
export function InteractiveGridPattern({
  width = 40, // Ancho por defecto de cada cuadrado
  height = 40, // Altura por defecto de cada cuadrado
  squares = [70, 70], // Número por defecto de cuadrados en la cuadrícula
  className, // Nombre de la clase para la cuadrícula
  squaresClassName, // Nombre de la clase para los cuadrados
  ...props // Otras propiedades SVG
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares; // Desestructura el número de cuadrados horizontales y verticales
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null); // Estado para el cuadrado actualmente sobre el que se pasa el ratón

  return (
    <svg
      width={width * horizontal} // Establece el ancho total del SVG
      height={height * vertical} // Establece la altura total del SVG
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30", // Clases CSS por defecto
        className, // Añade clases adicionales si se proporcionan
      )}
      {...props} // Pasa otras propiedades SVG
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width; // Calcula la posición x del cuadrado
        const y = Math.floor(index / horizontal) * height; // Calcula la posición y del cuadrado
        return (
          <rect
            key={index} // Clave única para cada cuadrado
            x={x} // Posición x del cuadrado
            y={y} // Posición y del cuadrado
            width={width} // Ancho del cuadrado
            height={height} // Altura del cuadrado
            className={cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000", // Clases CSS por defecto
              hoveredSquare === index ? "fill-orange-300/30" : "fill-transparent", // Cambia el color de relleno si el cuadrado está siendo sobrevolado
              squaresClassName, // Añade clases adicionales si se proporcionan
            )}
            onMouseEnter={() => setHoveredSquare(index)} // Establece el cuadrado sobre el que se pasa el ratón
            onMouseLeave={() => setHoveredSquare(null)} // Restablece el estado cuando el ratón sale del cuadrado
          />
        );
      })}
    </svg>
  );
}