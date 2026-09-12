"use client";

import dynamic from "next/dynamic";
import React from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-950/10 via-transparent to-purple-950/10 opacity-50" />
  ),
});

export function HeroSceneWrapper() {
  return <HeroScene />;
}
