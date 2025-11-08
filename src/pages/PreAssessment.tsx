import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Brain, CheckCircle2, XCircle, Timer, Trophy, Zap, Award, Sparkles } from "lucide-react";
import { Calculator } from "@/components/Calculator";
import { ScratchPad } from "@/components/ScratchPad";
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showNotice, setShowNotice] = useState(false);
  const [showProfessorIntro, setShowProfessorIntro] = useState(true);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchPad, setShowScratchPad] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

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


  const handleProfessorIntroContinue = () => {
    setShowProfessorIntro(false);
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

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswers([...answers, index]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const finalAnswers = [...answers, index];
      const correctCount = finalAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
      localStorage.setItem("preAssessmentScore", correctCount.toString());
      setShowResult(true);
    }
  };


  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <>
      {/* Professor Wise Introduction */}
      {showProfessorIntro && (
        <div className="min-h-screen bg-background overflow-y-auto">
          <div className="container max-w-4xl mx-auto px-4 py-12">
            <div className="space-y-8 animate-slide-up">
              
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary shadow-glow animate-bounce-gentle mb-4">
                  <span className="text-5xl">🧙‍♂️</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Hey! I'm Professor Wise 🎓
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  I'm your personal AI tutor, and I'm super excited to be part of your math adventure! 
                  Think of me as your always-available friend who's here to help you become a math superstar.
                </p>
              </div>

              {/* Challenge Box */}
              <Card className="p-8 border-2 border-primary/20 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎮</span>
                    <h2 className="text-2xl font-bold">Let's Start with a Fun Challenge!</h2>
                  </div>
                  <p className="text-base leading-relaxed">
                    We're going to begin with a quick <span className="font-semibold text-primary">pre-assessment</span>! 
                    Don't worry - this isn't a test you can fail. It's actually a fun way for me to get to know what you already know, 
                    so I can create the perfect learning adventure just for you!
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Remember: It's totally okay if you don't know some answers - that's what we're here to learn together! ✨
                  </p>
                </div>
              </Card>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <Button
                  size="lg"
                  onClick={handleProfessorIntroContinue}
                  className="text-lg px-12 py-7 h-auto shadow-glow hover:shadow-purple transition-all duration-300 hover:scale-105"
                  variant="fun"
                >
                  🚀 Let's Begin the Pre-Assessment!
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}

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
                    <span>10 quick questions - answer at your own pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>No right or wrong - just exploring what you know!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Earn a special badge when you complete it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>This helps us personalize your learning journey!</span>
                  </li>
              </ul>
            </div>
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

      {/* Calculator */}
      <Calculator open={showCalculator} onOpenChange={setShowCalculator} />

      {/* Scratch Pad */}
      <ScratchPad open={showScratchPad} onOpenChange={setShowScratchPad} />

      {/* Quiz Interface */}
      {hasStarted && !showResult && (
        <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 py-8">
          <div className="container max-w-5xl mx-auto px-4">
            {/* Progress Header */}
            <div className="flex justify-center items-center mb-6">
              <Card className="px-8 py-4 flex items-center gap-3 border-2 border-primary/20">
                <Brain className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-lg font-bold">{currentQuestion + 1} / {questions.length}</p>
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
                      {question.topic}
                    </Badge>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-3"
                  />
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
                      
                      let buttonClass = `relative h-32 rounded-2xl border-4 transition-all duration-300 ${color.text} font-bold text-lg
                        bg-gradient-to-br ${color.bg} ${color.hover} ${color.border} hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl
                      `;
                      
                      return (
                        <button
                          key={index}
                          className={buttonClass}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                            <div className="text-3xl font-black">{String.fromCharCode(65 + index)}</div>
                            <div className="text-base md:text-lg">{option}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tools */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
            <Button
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-14 h-14 rounded-full shadow-glow"
              size="icon"
              variant="secondary"
            >
              🔢
            </Button>
            <Button
              onClick={() => setShowScratchPad(!showScratchPad)}
              className="w-14 h-14 rounded-full shadow-glow"
              size="icon"
              variant="secondary"
            >
              ✏️
            </Button>
          </div>
          <AIAssistant 
            sectionTitle="Pre-Assessment"
            helpText="Take your time with each question. This helps us understand what you know so we can create the perfect learning path for you!"
          />
        </div>
      )}

      {/* Badge Completion Screen */}
      {showResult && (
        <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 flex items-center justify-center py-12 px-4">
          <Card className="max-w-2xl w-full p-12 text-center shadow-glow border-2 border-primary/20 animate-scale-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-bounce-gentle">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-lg px-6 py-2">
              Achievement Unlocked!
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Pre-Assessment Complete!
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Amazing work! You've earned the <span className="font-bold text-primary">Explorer Badge</span> 🏆
            </p>

            <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-lg mb-3">What's Next?</h2>
              <p className="text-muted-foreground">
                I've analyzed your responses and created a personalized learning path just for you! 
                Let's start your math adventure with lessons perfectly matched to your level.
              </p>
            </div>

            <Button
              onClick={() => navigate("/journey-intro")}
              size="lg"
              variant="fun"
              className="text-lg px-12 py-7 h-auto shadow-glow hover:scale-105 transition-all duration-300"
            >
              🚀 Continue Your Journey
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default PreAssessment;