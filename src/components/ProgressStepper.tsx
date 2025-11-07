import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export const ProgressStepper = ({ steps, currentStep, onStepClick }: ProgressStepperProps) => {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => onStepClick?.(index)}
                className={cn(
                  "flex items-center gap-2 transition-all duration-300 group",
                  index <= currentStep ? "opacity-100" : "opacity-40"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    index < currentStep && "bg-success text-success-foreground",
                    index === currentStep && "bg-primary text-primary-foreground",
                    index > currentStep && "bg-muted text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={cn(
                  "hidden md:block text-sm font-medium transition-colors",
                  index === currentStep && "text-primary"
                )}>
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 flex-1 mx-2 transition-all duration-500",
                  index < currentStep ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
