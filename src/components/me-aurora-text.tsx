"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
export function AuroraTextDemo() {
  return (
    <h1 className="
    font-bold // Aplica un peso de fuente negrita
    tracking-tighter // Aplica un espaciado de letras más ajustado
    text-4xl // Aplica un tamaño de fuente grande (aproximadamente 2.25rem)
    md:text-5xl // Aplica un tamaño de fuente grande (aproximadamente 3rem) en pantallas medianas 
    lg:text-7xl // Aplica un tamaño de fuente grande (aproximadamente 5rem) en pantallas grandes
    mr-10 // Aplica un margen de 1rem (16px) en el lado derecho del elemento
    lg:mr-20 // Aplica un margen de 1.25rem (20px) en el lado derecho del elemento en pantallas grandes
    xl:mr-40 // Aplica un margen de 2.5rem (40px) en el lado derecho del elemento en pantallas extra grandes
    ">
      En <AuroraText>FoodDraft</AuroraText>, descubre, crea y comparte recetas con una comunidad apasionada por la cocina. ¡Inspírate y cocina sin límites! 🍲🔥
    </h1>
  );
}
