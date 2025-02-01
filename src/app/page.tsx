import { InteractiveGridPatternDemo } from "@/components/me-interactive-grid-pattern";
import { NavigationMenuDemo } from "@/components/me-navigation-menu";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <div className="flex items-center justify-between p-3 text-color-500">
          <NavigationMenuDemo />
        </div>
      </header>

      <main>
        <div>
          <InteractiveGridPatternDemo />
        </div>
        
      
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
} 