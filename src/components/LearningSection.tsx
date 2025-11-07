import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LearningSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlight";
}

export const LearningSection = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className,
  variant = "default" 
}: LearningSectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "py-8 md:py-12 scroll-mt-20",
        variant === "highlight" && "bg-muted/30",
        className
      )}
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};
