import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Award, AlertCircle, Timer, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AssessmentQuizProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export const AssessmentQuiz = ({ questions, onComplete }: AssessmentQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showWhyDialog, setShowWhyDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!completed && !showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [completed, showResult, timeLeft]);

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const timeBonus = Math.floor(timeLeft / 5);
      setScore(score + 100 + timeBonus);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  if (completed) {
    return (
      <Card className="p-8 text-center shadow-medium">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Practice Complete! 🎉</h3>
        <p className="text-4xl font-bold text-primary mb-4">
          {score} points
        </p>
        <p className="text-muted-foreground mb-6">
          Great job completing the practice problems!
        </p>
        <Button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          variant="fun"
        >
          Review Lesson
        </Button>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="space-y-4">
      {/* Score and Timer Header */}
      <div className="flex justify-between items-center">
        <Card className="px-6 py-3 flex items-center gap-3 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <Trophy className="w-6 h-6 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="text-2xl font-bold text-primary">{score}</p>
          </div>
        </Card>
        
        <Card className={`px-6 py-3 flex items-center gap-3 border-2 ${
          timeLeft <= 10 ? 'border-destructive/50 bg-destructive/10' : 'border-accent/20 bg-accent/5'
        }`}>
          <Timer className={`w-6 h-6 ${timeLeft <= 10 ? 'text-destructive' : 'text-accent'}`} />
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-accent'}`}>{timeLeft}s</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 md:p-8 shadow-glow border-2">
        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-4 py-2">
                <Zap className="w-4 h-4 mr-1" />
                Practice
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Question */}
          <div className="text-center py-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-12 animate-fade-in">
              {question.question}
            </h2>

            {/* Kahoot-style Answer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {question.options.map((option, index) => {
                const colors = [
                  { bg: 'from-red-500 to-red-600', hover: 'hover:from-red-600 hover:to-red-700', border: 'border-red-500', text: 'text-white' },
                  { bg: 'from-blue-500 to-blue-600', hover: 'hover:from-blue-600 hover:to-blue-700', border: 'border-blue-500', text: 'text-white' },
                  { bg: 'from-yellow-500 to-yellow-600', hover: 'hover:from-yellow-600 hover:to-yellow-700', border: 'border-yellow-500', text: 'text-white' },
                  { bg: 'from-green-500 to-green-600', hover: 'hover:from-green-600 hover:to-green-700', border: 'border-green-500', text: 'text-white' }
                ];
                const color = colors[index];
                
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                
                let buttonClass = `relative h-32 rounded-2xl border-4 transition-all duration-300 ${color.text} font-bold text-lg
                  ${!showResult ? `bg-gradient-to-br ${color.bg} ${color.hover} ${color.border} hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl` : ''}
                  ${showResult && isCorrectAnswer ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 scale-105' : ''}
                  ${showResult && isSelected && !isCorrect ? 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500 opacity-50' : ''}
                  ${showResult && !isSelected && !isCorrectAnswer ? 'opacity-40' : ''}
                `;
                
                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                      <div className="text-3xl font-black">{String.fromCharCode(65 + index)}</div>
                      <div className="text-base md:text-lg">{option}</div>
                    </div>
                    {showResult && isCorrectAnswer && (
                      <CheckCircle2 className="absolute top-3 right-3 w-8 h-8 text-white animate-bounce" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="absolute top-3 right-3 w-8 h-8 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div className="text-center animate-fade-in">
              <Card className={`p-6 border-2 ${isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                      <h3 className="text-2xl font-bold text-green-600">Correct! 🎉</h3>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-red-600" />
                      <h3 className="text-2xl font-bold text-red-600">Not quite!</h3>
                    </>
                  )}
                </div>
                {isCorrect && (
                  <p className="text-muted-foreground">+{100 + Math.floor(timeLeft / 5)} points (includes time bonus!)</p>
                )}
                {!isCorrect && (
                  <Button
                    variant="outline"
                    onClick={() => setShowWhyDialog(true)}
                    className="mt-3"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Why?
                  </Button>
                )}
              </Card>
              <Button
                onClick={handleNext}
                size="lg"
                className="mt-6 min-w-[200px] text-lg"
                variant="fun"
              >
                {currentQuestion === questions.length - 1 ? "🏁 Finish" : "Next Question →"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Why Dialog */}
      <AlertDialog open={showWhyDialog} onOpenChange={setShowWhyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              Let me explain!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed pt-4">
              {question.explanation}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowWhyDialog(false)} variant="fun">
              Got it, thanks!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
