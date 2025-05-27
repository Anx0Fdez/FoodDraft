"use client";

import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { DockDemo } from "../feed/_components/InteractiveDock";
import RecipesApi from "./dictionary-api/recipes-api";
import { useAuth } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="z-10">
      <DockDemo />
      </div>
      <RecipesApi />
    </div>
  );
}
