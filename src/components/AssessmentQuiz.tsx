import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssessmentQuizProps {
  questions: QuizQuestion[];
}

export const AssessmentQuiz = ({ questions }: AssessmentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    const isCorrect = parseInt(selectedAnswer) === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="p-8 text-center shadow-medium">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Assessment Complete!</h3>
        <p className="text-4xl font-bold text-primary mb-4">
          {score}/{questions.length}
        </p>
        <p className="text-muted-foreground mb-6">
          You scored {percentage}%! {percentage >= 80 ? "Excellent work! 🎉" : "Keep practicing!"}
        </p>
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-primary hover:bg-primary/90"
        >
          Review Lesson
        </Button>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = showFeedback && parseInt(selectedAnswer) === question.correctAnswer;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-primary">{score} correct</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6 shadow-medium">
        <h3 className="text-xl font-bold mb-6">{question.question}</h3>
        
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showFeedback}>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  showFeedback
                    ? index === question.correctAnswer
                      ? "border-success bg-success/10"
                      : index === parseInt(selectedAnswer)
                      ? "border-destructive bg-destructive/10"
                      : "border-border"
                    : selectedAnswer === index.toString()
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option}
                </Label>
                {showFeedback && (
                  <>
                    {index === question.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    )}
                    {index === parseInt(selectedAnswer) && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </RadioGroup>

        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span className="font-semibold">
                {isCorrect ? "Correct!" : "Not quite"}
              </span>
            </div>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!showFeedback ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-primary hover:bg-primary/90"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {currentQuestion < questions.length - 1 ? "Next Question" : "Complete"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
