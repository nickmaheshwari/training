"use client";

import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({
  onClick,
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-900 hover:bg-green-500 
                 rounded-full flex items-center justify-center shadow-lg 
                 transition-transform transform hover:scale-105 focus:outline-none"
    >
      <Plus className="w-8 h-8 text-white" />
    </button>
  );
}
