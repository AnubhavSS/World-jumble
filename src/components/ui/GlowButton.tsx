// components/common/GlowButton.tsx

import React from "react"
import { cn } from "../../lib/utils"

type GlowButtonProps = {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const GlowButton = ({
  children,
  className,
  ...props
}: GlowButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer",  
        "w-full sm:w-auto",
        "px-5 py-2.5 sm:px-6 sm:py-3 mt-2",
        "text-sm sm:text-base font-medium text-white",
        "rounded-xl",
        "bg-white",
        "border border-white/10",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {/* Glow Border */}
      <span className="absolute inset-0 rounded-xl p-px bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 hover:opacity-100 transition duration-300" />

      {/* Inner Background */}
      <span className="absolute inset-px rounded-xl bg-[#9D4EDD]" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}