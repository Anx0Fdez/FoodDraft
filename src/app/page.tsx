import HeroSection from "@/components/HeroSection";
import NavegationBar from "@/components/NavegationBar";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (

    <main>
      <div>
        <NavegationBar />
      </div>
      <div className="container mx-auto mt-5 px-4">
        <section>
          <HeroSection />
        </section>
      </div>

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