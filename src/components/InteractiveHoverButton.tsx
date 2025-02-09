"use client"; // Indica que el código se ejecutará en el cliente

import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SignUpButton } from "@clerk/nextjs";

export function InteractiveHoverButtonDemo() {
  return <SignUpButton><InteractiveHoverButton>Empecemos</InteractiveHoverButton></SignUpButton>;
}
