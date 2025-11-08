import { useState } from "react";
import { GuidedProblem } from "./GuidedProblem";

interface DiscussionQuestionsProps {
  onComplete?: () => void;
}

export const DiscussionQuestions = ({ onComplete }: DiscussionQuestionsProps) => {
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    {
      number: 1,
      title: "Combining Like Terms",
      description: "Simplify: 4x + 3 + 2x - 1",
      mode: "watch" as const,
      steps: [
        {
          question: "First, identify the like terms",
          correctApproach: "The like terms here are 4x and 2x (both have the variable x), and 3 and -1 (both are constants)."
        },
        {
          question: "Combine the variable terms",
          correctApproach: "4x + 2x = 6x. We add the coefficients: 4 + 2 = 6."
        },
        {
          question: "Combine the constant terms",
          correctApproach: "3 + (-1) = 2. Remember, adding a negative is the same as subtracting."
        },
        {
          question: "Write the final answer",
          correctApproach: "Our simplified expression is 6x + 2. Always write the variable term first!"
        }
      ]
    },
    {
      number: 2,
      title: "Distributive Property",
      description: "Expand and simplify: 3(2x + 4)",
      mode: "together" as const,
      steps: [
        {
          question: "What should we multiply 3 by first?",
          hint: "Think about what's inside the parentheses",
          correctApproach: "We multiply 3 by 2x to get 6x"
        },
        {
          question: "Now what do we multiply 3 by?",
          hint: "Don't forget the second term!",
          correctApproach: "We multiply 3 by 4 to get 12"
        },
        {
          question: "What's our final answer?",
          hint: "Combine both results",
          correctApproach: "6x + 12. Great job!"
        }
      ]
    },
    {
      number: 3,
      title: "Your Turn: Complete Problem",
      description: "Simplify: 5(x - 2) + 3x",
      mode: "independent" as const,
      steps: [
        {
          question: "Use the distributive property on 5(x - 2)",
          hint: "Multiply 5 by each term inside the parentheses",
          correctApproach: "Good! 5(x - 2) = 5x - 10. Remember to distribute to both terms."
        },
        {
          question: "Now rewrite the entire expression",
          hint: "Replace 5(x - 2) with what you just found",
          correctApproach: "Correct! We have 5x - 10 + 3x"
        },
        {
          question: "Finally, combine like terms",
          hint: "Which terms can be combined?",
          correctApproach: "Perfect! 5x + 3x = 8x, so the final answer is 8x - 10"
        }
      ]
    }
  ];

  const handleProblemComplete = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground font-medium">
          Problem {currentProblem + 1} of {problems.length}
        </span>
        <div className="flex gap-2">
          {problems.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentProblem
                  ? "bg-primary w-8"
                  : idx < currentProblem
                  ? "bg-success w-2"
                  : "bg-border w-2"
              }`}
            />
          ))}
        </div>
      </div>

      <GuidedProblem
        problemNumber={problems[currentProblem].number}
        title={problems[currentProblem].title}
        description={problems[currentProblem].description}
        mode={problems[currentProblem].mode}
        steps={problems[currentProblem].steps}
        onComplete={handleProblemComplete}
      />
    </div>
  );
};