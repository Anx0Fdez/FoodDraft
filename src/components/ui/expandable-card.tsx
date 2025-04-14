"use client";

import React, { useRef, useEffect,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MessageSquare,
  Users,
  CheckCircle2,
  ChefHat,
  Timer,
  Utensils,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExpandable } from "@/hooks/use-expandable";
import { UserButton } from "@clerk/nextjs";
import { Badge } from '@/components/ui/badge'

interface RecipeCardProps {
  title: string;
  description: string;
  cookingTime: string;
  difficulty: string;
  ingredients: Array<{ name: string; amount: string }>;
  steps: Array<{ description: string; completed: boolean }>;
  author: string;
}

export function RecipeCard({
  title,
  description,
  cookingTime,
  difficulty,
  ingredients,
  steps,
  author,
}: RecipeCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {window.removeEventListener("resize", updateWidth);};
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <UserButton />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground" style={{ lineHeight: '1.8rem', marginBottom: '1.5rem' }}>{description}</p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {cookingTime}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <ChefHat className="h-3 w-3" />
              {difficulty}
            </Badge>
          </div>
          
          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex pt-2"
                  >
                    <div className="w-1/2">
                      <h3 className="font-semibold mb-2">Ingredientes:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {ingredients.map((ingredient, index) => (
                          <li key={index} className="text-sm">
                            {ingredient.name} - {ingredient.amount}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="w-1/2 ml-32">
                      <h3 className="font-semibold mb-2">Pasos:</h3>
                      <ul className="space-y-2">
                        {steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-sm">{step.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Por {author}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ocultar detalles
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver detalles
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
