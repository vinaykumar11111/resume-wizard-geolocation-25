
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const StepIndicator = ({ steps, currentStep, className }: StepIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn("step-indicator", {
              active: currentStep === index + 1,
              completed: currentStep > index + 1,
            })}
          >
            {currentStep > index + 1 ? (
              <Check className="w-4 h-4" />
            ) : (
              index + 1
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn("step-line", {
                active: currentStep > index + 1,
              })}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
