"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";
export function AuroraTextDemo() {
  return (
    <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      En <AuroraText>FoodDraft</AuroraText>, descubre, crea y comparte recetas con una comunidad apasionada por la cocina. ¡Inspírate y cocina sin límites! 🍲🔥
    </h1>
  );
}
