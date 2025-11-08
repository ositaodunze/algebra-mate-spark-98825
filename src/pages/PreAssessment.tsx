import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

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

  const handleNext = () => {
    const answer = selectedAnswer ? parseInt(selectedAnswer) : -1;
    setAnswers([...answers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Calculate score and navigate to journey intro
      const score = answers.filter((a, i) => a === questions[i].correctAnswer).length;
      localStorage.setItem("preAssessmentScore", score.toString());
      navigate("/journey-intro");
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
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
      </div>
    </div>
  );
};

export default PreAssessment;
