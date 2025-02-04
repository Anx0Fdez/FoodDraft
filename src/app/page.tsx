import { InteractiveGridPatternDemo } from "@/components/me-interactive-grid-pattern";
import { NavigationMenuDemo } from "@/components/me-navigation-menu";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <NavigationMenuDemo />
        </div>
      </header>

      <main>
        <div>
          <InteractiveGridPatternDemo />
        </div>
      </main>
    </div>
  );
} 