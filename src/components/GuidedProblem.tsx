import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

interface Step {
  question: string;
  hint?: string;
  correctApproach: string;
}

interface GuidedProblemProps {
  problemNumber: number;
  title: string;
  description: string;
  mode: "watch" | "together" | "independent";
  steps: Step[];
  onComplete: () => void;
}

export const GuidedProblem = ({ 
  problemNumber, 
  title, 
  description, 
  mode, 
  steps,
  onComplete 
}: GuidedProblemProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasQuestions, setHasQuestions] = useState<boolean | null>(null);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStep(currentStep + 1);
      setUserAnswer("");
      setShowHint(false);
      setHasQuestions(null);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  // "I do" mode - AI demonstrates
  if (mode === "watch") {
    return (
      <Card className="p-6 shadow-medium border-l-4 border-l-primary">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <Badge className="mb-2 bg-blue-500">I'll Show You</Badge>
            <h3 className="text-xl font-bold mb-2">Problem {problemNumber}: {title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
          </div>
        </div>

        {!isCompleted ? (
          <div className="space-y-4 ml-16">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="font-semibold mb-2">Step {currentStep + 1}: {currentStepData.question}</p>
              <p className="text-muted-foreground">{currentStepData.correctApproach}</p>
            </div>

            {hasQuestions === null && currentStep === steps.length - 1 && (
              <div className="space-y-3">
                <p className="font-medium">Do you have any questions about what I just showed you?</p>
                <div className="flex gap-3">
                  <Button onClick={() => setHasQuestions(true)} variant="outline">
                    Yes, I have questions
                  </Button>
                  <Button onClick={() => { setHasQuestions(false); handleNext(); }} variant="fun">
                    No, I understand! Let's continue
                  </Button>
                </div>
              </div>
            )}

            {hasQuestions === true && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Ask me anything about this problem..."
                  className="min-h-24"
                />
                <Button variant="fun" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI Tutor
                </Button>
              </div>
            )}

            {hasQuestions === null && currentStep < steps.length - 1 && (
              <Button onClick={handleNext} variant="fun">
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        ) : (
          <div className="ml-16 space-y-3">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold text-success">Problem Complete!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Great! Now let's work on the next problem together.
              </p>
            </div>
            <Button onClick={handleFinish} variant="fun" className="w-full">
              Continue to Next Problem <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </Card>
    );
  }

  // "We do" mode - Work together
  if (mode === "together") {
    return (
      <Card className="p-6 shadow-medium border-l-4 border-l-secondary">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <Badge className="mb-2 bg-green-500">Let's Work Together</Badge>
            <h3 className="text-xl font-bold mb-2">Problem {problemNumber}: {title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
          </div>
        </div>

        {!isCompleted ? (
          <div className="space-y-4 ml-16">
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
              <p className="font-semibold mb-3">Step {currentStep + 1}: {currentStepData.question}</p>
              <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-20 mb-3"
              />
              {showHint && currentStepData.hint && (
                <p className="text-sm text-muted-foreground italic mb-2">
                  💡 Hint: {currentStepData.hint}
                </p>
              )}
              <div className="flex gap-2">
                {!showHint && currentStepData.hint && (
                  <Button variant="outline" onClick={() => setShowHint(true)}>
                    Show Hint
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  disabled={!userAnswer.trim()}
                  variant="fun"
                >
                  {isLastStep ? "Finish Problem" : "Next Step"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="ml-16 space-y-3">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold text-success">Excellent Work!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You've completed this problem. Ready to try one on your own?
              </p>
            </div>
            <Button onClick={handleFinish} variant="fun" className="w-full">
              Continue to Independent Practice <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </Card>
    );
  }

  // "You do" mode - Independent work with AI guidance
  return (
    <Card className="p-6 shadow-medium border-l-4 border-l-accent">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <Badge className="mb-2 bg-purple-500">Your Turn!</Badge>
          <h3 className="text-xl font-bold mb-2">Problem {problemNumber}: {title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-4 ml-16">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <p className="font-semibold mb-3">Step {currentStep + 1}: {currentStepData.question}</p>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Show your work here..."
              className="min-h-20 mb-3"
            />
            {showHint && currentStepData.hint && (
              <div className="bg-primary/10 border border-primary/20 rounded p-3 mb-3">
                <p className="text-sm font-medium mb-1">AI Tutor Feedback:</p>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.correctApproach}
                </p>
              </div>
            )}
            <div className="flex gap-2">
              {!showHint && (
                <Button variant="outline" onClick={() => setShowHint(true)}>
                  Check My Work
                </Button>
              )}
              {showHint && (
                <Button 
                  onClick={handleNext}
                  variant="fun"
                >
                  {isLastStep ? "Finish Problem" : "Next Step"}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="ml-16 space-y-3">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="font-semibold text-success">Amazing Job!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You solved this problem independently! Ready for more practice?
            </p>
          </div>
          <Button onClick={handleFinish} variant="fun" className="w-full">
            Continue to Practice Problems <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </Card>
  );
};
