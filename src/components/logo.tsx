"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes"; // theme hook

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
  showText?: boolean; // backward compatibility
}

const sizeConfig = {
  sm: { container: "h-6 w-6" },
  md: { container: "h-8 w-8" },
  lg: { container: "h-18 w-18" },
  xl: { container: "h-15 w-40" },
};

export function Logo({
  size = "md",
  clickable = true,
  className,
  onClick,
}: LogoProps) {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();

  // Handle "system" preference safely
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Dynamically pick logo based on current theme
  // 👇 when the theme is dark (black background), use logo-black.png
  const logoSrc = currentTheme === "dark" ? "/logo-black.png" : "/logo.png";

  // Handle clicks
  const handleClick = () => {
    if (onClick) onClick();
    else if (clickable) router.push("/");
  };

  const config = sizeConfig[size];

  const logoImage = (
    <div className="relative flex items-center justify-center">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-transparent",
          config.container
        )}
      >
        <motion.div
          key={logoSrc} // helps animate logo change
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-full w-full"
        >
          <Image
            src={logoSrc}
            alt="Tick HRMS Logo"
            fill
            className="object-contain transition-all duration-300"
            priority
          />
        </motion.div>
      </div>
    </div>
  );

  if (clickable || onClick) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn("flex cursor-pointer items-center", className)}
        onClick={handleClick}
      >
        {logoImage}
      </motion.div>
    );
  }

  return <div className={cn("flex items-center", className)}>{logoImage}</div>;
}
