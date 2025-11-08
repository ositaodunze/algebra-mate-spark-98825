import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Brain, Calculator as CalcIcon, PenTool } from "lucide-react";
import { Calculator } from "@/components/Calculator";
import { ScratchPad } from "@/components/ScratchPad";
import { TutorIntro } from "@/components/TutorIntro";
import { AIAssistant } from "@/components/AIAssistant";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
}

const PreAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showNotice, setShowNotice] = useState(true);
  const [showTutorIntro, setShowTutorIntro] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchPad, setShowScratchPad] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const questions: Question[] = [
    {
      id: "q1",
      question: "What is 5x + 3x?",
      options: ["8x", "8x²", "15x", "5x + 3x"],
      correctAnswer: 0,
      topic: "Expressions & Variables",
    },
    {
      id: "q2",
      question: "Solve: x + 7 = 15",
      options: ["x = 7", "x = 8", "x = 15", "x = 22"],
      correctAnswer: 1,
      topic: "Linear Equations",
    },
    {
      id: "q3",
      question: "Simplify: 3(x + 2)",
      options: ["3x + 2", "3x + 6", "3x + 5", "x + 6"],
      correctAnswer: 1,
      topic: "Distributive Property",
    },
    {
      id: "q4",
      question: "What is the slope of the line y = 2x + 5?",
      options: ["5", "2", "x", "2x"],
      correctAnswer: 1,
      topic: "Linear Functions",
    },
    {
      id: "q5",
      question: "Factor: x² + 5x + 6",
      options: ["(x + 2)(x + 3)", "(x + 1)(x + 6)", "(x - 2)(x - 3)", "Cannot be factored"],
      correctAnswer: 0,
      topic: "Factoring",
    },
    {
      id: "q6",
      question: "Solve: 2x - 3 = 11",
      options: ["x = 4", "x = 7", "x = 8", "x = 14"],
      correctAnswer: 1,
      topic: "Linear Equations",
    },
    {
      id: "q7",
      question: "What is the y-intercept of y = 3x - 4?",
      options: ["3", "-4", "x", "3x"],
      correctAnswer: 1,
      topic: "Linear Functions",
    },
    {
      id: "q8",
      question: "Simplify: 2(3x - 1) + 4",
      options: ["6x + 2", "6x - 2", "6x + 6", "6x + 3"],
      correctAnswer: 0,
      topic: "Order of Operations",
    },
    {
      id: "q9",
      question: "Solve the inequality: x + 5 > 12",
      options: ["x > 17", "x > 7", "x < 7", "x > 5"],
      correctAnswer: 1,
      topic: "Inequalities",
    },
    {
      id: "q10",
      question: "Which represents a direct variation?",
      options: ["y = x + 3", "y = 2x", "y = x²", "y = 1/x"],
      correctAnswer: 1,
      topic: "Functions",
    },
  ];

  useEffect(() => {
    setShowTutorIntro(true);
  }, []);

  const handleTutorIntroContinue = () => {
    setShowTutorIntro(false);
    setShowNotice(true);
  };

  const handleNoticeResponse = (ready: boolean) => {
    if (ready) {
      setShowNotice(false);
      setHasStarted(true);
    } else {
      navigate("/");
    }
  };

  const handleNext = () => {
    const answer = selectedAnswer ? parseInt(selectedAnswer) : -1;
    setAnswers([...answers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Complete the assessment and navigate to journey intro
      const finalAnswers = [...answers, answer];
      const score = finalAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
      localStorage.setItem("preAssessmentScore", score.toString());
      navigate("/journey-intro");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <>
      {/* Notice Dialog */}
      <AlertDialog open={showNotice} onOpenChange={setShowNotice}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-10 h-10 text-primary" />
              </div>
              <AlertDialogTitle className="text-3xl font-bold">Ready to Begin?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base space-y-4 text-center">
              <p className="text-lg">
                You're about to start the <strong>Math4You Pre-Assessment</strong>.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 space-y-3 text-left">
                <p className="font-semibold text-foreground">What to expect:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>10 questions covering key Algebra 1 concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Use the calculator and scratch pad tools to help you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Your AI tutor is available if you need guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Don't worry about perfection - this helps us personalize your journey!</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Take your time and do your best. Ready when you are!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => handleNoticeResponse(false)}
              className="w-full sm:w-auto"
            >
              Not Yet
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto" 
              onClick={() => handleNoticeResponse(true)}
              size="lg"
            >
              I'm Ready!
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Tutor Introduction */}
      <TutorIntro 
        open={showTutorIntro} 
        onOpenChange={setShowTutorIntro}
        onContinue={handleTutorIntroContinue}
      />

      {/* Calculator */}
      <Calculator open={showCalculator} onOpenChange={setShowCalculator} />

      {/* Scratch Pad */}
      <ScratchPad open={showScratchPad} onOpenChange={setShowScratchPad} />

      <div className="min-h-screen bg-background">
        {hasStarted && (
          <>
            <div className="bg-gradient-hero py-12 md:py-16 text-white">
              <div className="container max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6" />
                  <Badge className="bg-white/20 text-white border-white/30">
                    Step 2 of 2
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Algebra 1 Pre-Assessment
                </h1>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  This quick assessment helps us understand your current level and personalize your learning path
                </p>
              </div>
            </div>

            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowCalculator(true)}
                className="w-12 h-12 rounded-full shadow-lg"
                title="Calculator"
              >
                <CalcIcon className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowScratchPad(true)}
                className="w-12 h-12 rounded-full shadow-lg"
                title="Scratch Pad"
              >
                <PenTool className="w-5 h-5" />
              </Button>
            </div>

            <div className="container max-w-3xl mx-auto px-4 py-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <Badge variant="secondary">{question.topic}</Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <Card className="p-8 shadow-medium">
                  <h2 className="text-xl font-bold mb-6">{question.question}</h2>

                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                            selectedAnswer === index.toString()
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
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="mt-8 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Don't worry if you don't know some answers - this helps us find your starting point!
                    </p>
                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className="bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {currentQuestion < questions.length - 1 ? "Next" : "Complete"}
                    </Button>
                  </div>
                </Card>
              </div>

              <AIAssistant 
                sectionTitle="Pre-Assessment Help"
                helpText="I'm here to help! If you're stuck on a question, remember to use the calculator and scratch pad tools on the left. Don't worry about getting everything right - this is just to help us understand your current level."
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PreAssessment;
