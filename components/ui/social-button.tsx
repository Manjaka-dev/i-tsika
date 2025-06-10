"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialButtonProps {
  name: string;
  icon: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "filled";
}

export default function SocialButton({
  name,
  icon,
  url = "#",
  size = "md",
  variant = "outline",
}: SocialButtonProps) {
  const sizes = {
    sm: { button: "w-8 h-8", icon: 14 },
    md: { button: "w-10 h-10", icon: 18 },
    lg: { button: "w-12 h-12", icon: 24 },
  };
  
  const variants = {
    outline: "border-[#7b7979] hover:border-[#fbc63d] hover:bg-[#fbc63d]/10",
    filled: "bg-[#fbc63d] hover:bg-[#ffbb00] border-none text-[#070602]",
  };
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={`Visitez notre ${name}`}>
      <Button 
        variant="outline" 
        size="icon" 
        className={`${sizes[size].button} rounded-full transition-all duration-300 ${variants[variant]}`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={icon}
            alt={name}
            width={sizes[size].icon}
            height={sizes[size].icon}
            className="object-contain"
          />
        </div>
      </Button>
    </a>
  );
}
