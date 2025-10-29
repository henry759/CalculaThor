"use client";
import Calculator from "@/components/Calculator";
import { useState } from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-12">
      <div className="container mx-auto rounded-2xl border-2 border-slate-600 overflow-hidden">
        <Calculator />
      </div>
    </div>
  );
}
