// Página principal de la app. Muestra la barra de navegación, sección principal y animación de fondo.
import HeroSection from "@/components/HeroSection";
import NavegationBar from "@/components/NavegationBar";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main>
      {/* Barra de navegación superior */}
      <div>
        <NavegationBar />
      </div>
      {/* Sección principal con el héroe */}
      <div className="container mx-auto mt-5 px-4">
        <section>
          <HeroSection />
        </section>
      </div>
      {/* Animación de fondo decorativa */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </main>
  );
}