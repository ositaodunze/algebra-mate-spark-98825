import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  question: string;
  hint?: string;
}

interface DiscussionQuestionsProps {
  questions: Question[];
}

export const DiscussionQuestions = ({ questions }: DiscussionQuestionsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState<boolean[]>(Array(questions.length).fill(false));

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isSubmitted = submitted[currentIndex];

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const newSubmitted = [...submitted];
    newSubmitted[currentIndex] = true;
    setSubmitted(newSubmitted);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-primary w-8"
                  : submitted[idx]
                  ? "bg-success"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="p-6 shadow-medium">
        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <p className="font-semibold text-foreground">{currentQuestion.question}</p>
            
            {!isSubmitted ? (
              <>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your thoughts here..."
                  className="min-h-24 resize-none"
                />
                {currentQuestion.hint && (
                  <p className="text-sm text-muted-foreground italic">
                    💡 Hint: {currentQuestion.hint}
                  </p>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={!currentAnswer.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Great thinking!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your answer has been recorded. The AI tutor will provide feedback shortly.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Your response: {currentAnswer}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={goToNext}
          disabled={currentIndex === questions.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};