"use client";

import { RecipeCard } from "@/components/ui/expandable-card"

export default function ExpandableCardBasic() {
  return (
    <RecipeCard
      title="Paella Valenciana"
      description="La paella valenciana es un plato tradicional de la Comunidad Valenciana que combina arroz con verduras, carnes y especias, cocinado en una paellera sobre fuego de leña. Esta receta auténtica incluye ingredientes locales como el garrofó (una variedad de judía blanca), judías verdes y carnes como pollo y conejo. El secreto de una buena paella está en el sofrito inicial, el caldo de cocción y el punto exacto del arroz. Se sirve directamente de la paellera y es perfecta para compartir en familia o con amigos. La paella valenciana es más que un plato, es una experiencia gastronómica que representa la cultura mediterránea y la tradición culinaria valenciana."
      cookingTime="45 minutos"
      difficulty="Media"
      ingredients={[
        { name: "Arroz bomba", amount: "400g" },
        { name: "Pollo", amount: "300g" },
        { name: "Conejo", amount: "300g" },
        { name: "Judías verdes", amount: "200g" },
        { name: "Garrofó", amount: "100g" },
        { name: "Tomate rallado", amount: "200g" },
        { name: "Azafrán", amount: "1 pizca" },
        { name: "Aceite de oliva", amount: "100ml" },
        { name: "Sal", amount: "al gusto" }
      ]}
      steps={[
        { description: "Cortar las carnes en trozos y dorarlas en la paellera con aceite", completed: true },
        { description: "Añadir las verduras y sofreír", completed: true },
        { description: "Incorporar el tomate y cocinar hasta que se evapore el agua", completed: false },
        { description: "Añadir el agua caliente y el azafrán", completed: false },
        { description: "Cuando hierva, añadir el arroz y cocinar a fuego medio", completed: false }
      ]}
      author="Chef Juan"
    />
  )
}

export { RecipeCard }