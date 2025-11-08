import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MascotProps {
  emoji?: string;
  message: ReactNode;
  position?: "left" | "right" | "center";
  variant?: "primary" | "secondary" | "success" | "accent";
  className?: string;
  animate?: boolean;
}

export const Mascot = ({ 
  emoji = "🧙‍♂️", 
  message, 
  position = "left",
  variant = "primary",
  className,
  animate = true
}: MascotProps) => {
  const variantStyles = {
    primary: "bg-primary/10 border-primary/30 text-foreground",
    secondary: "bg-secondary/10 border-secondary/30 text-foreground",
    success: "bg-success/10 border-success/30 text-foreground",
    accent: "bg-accent/10 border-accent/30 text-foreground",
  };

  const positionStyles = {
    left: "flex-row",
    right: "flex-row-reverse",
    center: "flex-col items-center",
  };

  return (
    <div className={cn(
      "flex gap-4 items-start max-w-3xl",
      positionStyles[position],
      position === "center" && "mx-auto",
      className
    )}>
      {/* Mascot Character */}
      <div className={cn(
        "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-3xl md:text-4xl shadow-glow",
        animate && "animate-float"
      )}>
        {emoji}
      </div>

      {/* Speech Bubble */}
      <div className={cn(
        "relative rounded-2xl border-2 p-4 md:p-6 shadow-soft",
        variantStyles[variant],
        animate && "animate-slide-up"
      )}>
        {/* Bubble Tail */}
        {position !== "center" && (
          <div className={cn(
            "absolute top-6 w-4 h-4 rotate-45 border-2",
            variantStyles[variant],
            position === "left" ? "-left-2 border-r-0 border-b-0" : "-right-2 border-l-0 border-t-0"
          )} />
        )}
        
        <div className="relative z-10 text-sm md:text-base">
          {message}
        </div>
      </div>
    </div>
  );
};
