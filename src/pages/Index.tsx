import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LearningSection } from "@/components/LearningSection";
import { ProgressStepper } from "@/components/ProgressStepper";
import { VideoPlayer } from "@/components/VideoPlayer";
import { AssessmentQuiz } from "@/components/AssessmentQuiz";
import { AIAssistant } from "@/components/AIAssistant";
import { GuidedProblem } from "@/components/GuidedProblem";
import { BottomChat } from "@/components/BottomChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, Target, Gamepad2 } from "lucide-react";
import { VocabCard } from "@/components/VocabCard";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const savedInterests = localStorage.getItem("userInterests");
    setInterests(savedInterests ? JSON.parse(savedInterests) : []);
  }, []);

  const steps = [
    { id: "intro", label: "Introduction" },
    { id: "vocab", label: "Vocabulary" },
    { id: "application", label: "Applications" },
    { id: "concept", label: "Concept" },
    { id: "discussion", label: "Discussion" },
    { id: "examples", label: "Examples" },
    { id: "recap", label: "Recap" },
    { id: "assessment", label: "Assessment" },
  ];

  const vocabularyTerms = [
    {
      term: "Variable",
      definition: "A symbol (usually a letter) that represents an unknown number or quantity.",
      example: "In the expression 2x + 5, 'x' is the variable."
    },
    {
      term: "Expression",
      definition: "A mathematical phrase combining numbers, variables, and operations without an equals sign.",
      example: "3y - 7 is an expression."
    },
    {
      term: "Coefficient",
      definition: "The number multiplied by a variable in an algebraic expression.",
      example: "In 4x, the coefficient is 4."
    },
    {
      term: "Constant",
      definition: "A fixed value that doesn't change.",
      example: "In x + 8, the number 8 is a constant."
    },
  ];

  const quizQuestions = [
    {
      id: "q1",
      question: "In the expression 5x + 3, what is the coefficient?",
      options: ["x", "5", "3", "8"],
      correctAnswer: 1,
      explanation: "The coefficient is the number multiplied by the variable. In 5x, the coefficient is 5."
    },
    {
      id: "q2",
      question: "Which of these is a variable?",
      options: ["7", "y", "+", "12"],
      correctAnswer: 1,
      explanation: "A variable is a symbol (usually a letter) representing an unknown value. 'y' is a variable."
    },
    {
      id: "q3",
      question: "What is 2x + 3x simplified?",
      options: ["5x²", "5x", "6x", "2x³"],
      correctAnswer: 1,
      explanation: "When combining like terms with the same variable, add the coefficients: 2x + 3x = 5x"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const stepIndex = steps.findIndex(step => step.id === sectionId);
            if (stepIndex !== -1) {
              setCurrentStep(stepIndex);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" }
    );

    steps.forEach(step => {
      const element = document.getElementById(step.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    const stepId = steps[index].id;
    if (index === 0 || completedSections.includes(steps[index - 1].id)) {
      const element = document.getElementById(stepId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const isSectionLocked = (index: number) => {
    if (index === 0) return false;
    return !completedSections.includes(steps[index - 1].id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressStepper
        steps={steps} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Hero Section */}
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Algebra 1 • Lesson 1
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Expressions & Variables
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Master the building blocks of algebra through personalized, interactive learning
          </p>
        </div>
      </div>

      {/* Introduction */}
      <LearningSection
        id="intro"
        title="Introduction"
        subtitle="Let's explore how algebra helps us solve real-world problems"
      >
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Learning Goal</h3>
            <p className="text-sm text-muted-foreground">
              Understand variables and create algebraic expressions
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Why It Matters</h3>
            <p className="text-sm text-muted-foreground">
              Algebra is everywhere: budgets, games, coding, science
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-medium transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Key Concept</h3>
            <p className="text-sm text-muted-foreground">
              Variables represent unknown values we can solve for
            </p>
          </Card>
        </div>

        <VideoPlayer
          title="AI-Personalized Introduction"
          description="This video is customized based on your interests and learning style. Click play to begin!"
        />
        <AIAssistant
          sectionTitle="Welcome to Algebra!"
          helpText="I'm here to help you through this lesson! This introduction is personalized just for you based on your interests. After watching, we'll dive deeper into each concept together."
        />
      </LearningSection>

      {/* Vocabulary */}
      <LearningSection
        id="vocab"
        title="New Vocabulary"
        subtitle="Essential terms you'll use throughout this lesson"
        variant="highlight"
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {vocabularyTerms.map((vocab, index) => (
            <VocabCard
              key={index}
              term={vocab.term}
              definition={vocab.definition}
              example={vocab.example}
            />
          ))}
        </div>
        <AIAssistant
          sectionTitle="Understanding Vocabulary"
          helpText="These terms are the building blocks of algebra! Take your time with each one. Try to connect them to things you already know. If something is confusing, just ask me!"
        />
      </LearningSection>

      {/* Real-Life Applications */}
      <LearningSection
        id="application"
        title="Real-Life Applications"
        subtitle="See algebra in action based on what interests you"
      >
        <div className="space-y-4">
          {interests.includes("gaming") && (
            <Card className="p-6 border-l-4 border-l-secondary hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">🎮 Gaming</h3>
              <p className="text-muted-foreground mb-3">
                Game developers use expressions to calculate damage: If a sword does <span className="font-mono bg-muted px-2 py-1 rounded">10 + 3x</span> damage where x is your level, how much damage at level 5?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 10 + 3(5) = 25 damage
              </p>
            </Card>
          )}

          {interests.includes("sports") && (
            <Card className="p-6 border-l-4 border-l-accent hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">⚽ Sports</h3>
              <p className="text-muted-foreground mb-3">
                Track your stats! If you score <span className="font-mono bg-muted px-2 py-1 rounded">2g + 3a</span> fantasy points where g = goals and a = assists, what's your score with 4 goals and 2 assists?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 2(4) + 3(2) = 8 + 6 = 14 points
              </p>
            </Card>
          )}

          {interests.includes("music") && (
            <Card className="p-6 border-l-4 border-l-primary hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">🎵 Music</h3>
              <p className="text-muted-foreground mb-3">
                Streaming royalties: If you earn <span className="font-mono bg-muted px-2 py-1 rounded">0.004s</span> dollars per stream, how much for 1,000 streams?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 0.004(1000) = $4
              </p>
            </Card>
          )}

          {interests.includes("technology") && (
            <Card className="p-6 border-l-4 border-l-secondary hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">💻 Technology</h3>
              <p className="text-muted-foreground mb-3">
                Server costs: Cloud hosting is <span className="font-mono bg-muted px-2 py-1 rounded">50 + 0.15h</span> dollars where h is hours used. What's the cost for 200 hours?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 50 + 0.15(200) = 50 + 30 = $80
              </p>
            </Card>
          )}

          {interests.includes("cooking") && (
            <Card className="p-6 border-l-4 border-l-accent hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">🍳 Cooking</h3>
              <p className="text-muted-foreground mb-3">
                Recipe scaling: If a recipe needs <span className="font-mono bg-muted px-2 py-1 rounded">2c + 3s</span> cups of ingredients where c = flour cups and s = sugar cups, how much total for 3 cups flour and 2 cups sugar?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 2(3) + 3(2) = 6 + 6 = 12 cups total
              </p>
            </Card>
          )}

          {interests.includes("fitness") && (
            <Card className="p-6 border-l-4 border-l-primary hover:shadow-medium transition-shadow">
              <h3 className="text-lg font-bold mb-2">💪 Fitness</h3>
              <p className="text-muted-foreground mb-3">
                Calories burned: Running burns <span className="font-mono bg-muted px-2 py-1 rounded">100 + 10m</span> calories where m is minutes. How many for 30 minutes?
              </p>
              <p className="text-sm text-primary font-semibold">
                Answer: 100 + 10(30) = 100 + 300 = 400 calories
              </p>
            </Card>
          )}

          {/* Default examples if no interests match or as fallback */}
          {(!interests.length || 
            !interests.some(i => ["gaming", "sports", "music", "technology", "cooking", "fitness"].includes(i))) && (
            <>
              <Card className="p-6 border-l-4 border-l-secondary hover:shadow-medium transition-shadow">
                <h3 className="text-lg font-bold mb-2">💰 Money Management</h3>
                <p className="text-muted-foreground mb-3">
                  You earn $15/hour. Your weekly earnings can be expressed as <span className="font-mono bg-muted px-2 py-1 rounded">15h</span> where h is hours worked.
                </p>
                <p className="text-sm text-primary font-semibold">
                  If you work 12 hours: 15(12) = $180
                </p>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary hover:shadow-medium transition-shadow">
                <h3 className="text-lg font-bold mb-2">📱 Phone Plans</h3>
                <p className="text-muted-foreground mb-3">
                  Monthly cost: <span className="font-mono bg-muted px-2 py-1 rounded">30 + 0.10m</span> where m is extra minutes beyond your plan.
                </p>
                <p className="text-sm text-primary font-semibold">
                  With 100 extra minutes: 30 + 0.10(100) = $40
                </p>
              </Card>
            </>
          )}
        </div>
      </LearningSection>

      {/* Main Concept */}
      <LearningSection
        id="concept"
        title="Core Concept Explanation"
        subtitle="After watching the video, let's break down the key ideas"
        variant="highlight"
      >
        <Card className="p-8 shadow-medium">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold mb-4">What Makes an Algebraic Expression?</h3>
            
            <div className="bg-primary/10 border-l-4 border-l-primary p-4 rounded-r-lg mb-6">
              <p className="text-lg font-semibold mb-2">An expression combines:</p>
              <ul className="space-y-2">
                <li>📝 <strong>Variables</strong> - letters representing unknown values (x, y, n)</li>
                <li>🔢 <strong>Constants</strong> - fixed numbers (5, -3, 0.5)</li>
                <li>➕ <strong>Operations</strong> - addition, subtraction, multiplication, division</li>
                <li>✖️ <strong>Coefficients</strong> - numbers multiplied by variables (the 4 in 4x)</li>
              </ul>
            </div>

            <h4 className="font-bold mb-3">Example Breakdown:</h4>
            <div className="bg-card border-2 border-border rounded-lg p-6 text-center mb-6">
              <p className="text-3xl font-mono font-bold text-primary mb-4">5x + 3y - 7</p>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <Badge className="mb-2">5x</Badge>
                  <p className="text-sm">5 (coefficient) × x (variable)</p>
                </div>
                <div>
                  <Badge className="mb-2">3y</Badge>
                  <p className="text-sm">3 (coefficient) × y (variable)</p>
                </div>
                <div>
                  <Badge className="mb-2">-7</Badge>
                  <p className="text-sm">constant term</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <AIAssistant
          sectionTitle="Core Concepts"
          helpText="This is the heart of today's lesson! Variables are like containers that hold unknown values. Don't worry if it seems abstract - we'll practice with real examples soon!"
        />
      </LearningSection>

      {/* Guided Practice with AI Chat */}
      <LearningSection
        id="discussion"
        title="Guided Practice"
        subtitle="Let's practice step-by-step with progressively less help"
      >
        {isSectionLocked(4) ? (
          <Card className="p-12 text-center bg-muted/50">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Section Locked</h3>
            <p className="text-muted-foreground mb-4">
              Complete the previous section to unlock guided practice!
            </p>
            <Button 
              onClick={() => markSectionComplete(steps[3].id)}
              className="mt-2"
            >
              Unlock Section (Dev Mode)
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <GuidedProblem
              problemNumber={1}
              title="Identifying Parts of an Expression"
              description="Let me show you how to break down an algebraic expression into its parts."
              mode="watch"
              steps={[
                {
                  question: "Look at the expression: 3x + 7",
                  correctApproach: "First, I identify the variable. Here, 'x' is our variable - it represents an unknown number."
                },
                {
                  question: "What is the coefficient?",
                  correctApproach: "The coefficient is 3. It's the number being multiplied by our variable x."
                },
                {
                  question: "What about the constant?",
                  correctApproach: "The constant is 7. It's the number that stands alone without a variable."
                }
              ]}
              onComplete={() => {}}
            />

            <GuidedProblem
              problemNumber={2}
              title="Combining Like Terms"
              description="Now let's work together to simplify: 5y + 2y + 3"
              mode="together"
              steps={[
                {
                  question: "Which terms can we combine?",
                  hint: "Like terms have the same variable",
                  correctApproach: "We can combine 5y and 2y because they both have the variable 'y'."
                },
                {
                  question: "What is 5y + 2y?",
                  hint: "Add the coefficients: 5 + 2",
                  correctApproach: "5y + 2y = 7y. We add the coefficients (5 + 2 = 7) and keep the variable."
                },
                {
                  question: "What is our final simplified expression?",
                  correctApproach: "The final answer is 7y + 3. The constant 3 stays separate."
                }
              ]}
              onComplete={() => {}}
            />

            <GuidedProblem
              problemNumber={3}
              title="Your Turn!"
              description="Simplify this expression on your own: 4a + 6 + 2a"
              mode="independent"
              steps={[
                {
                  question: "First, identify the like terms",
                  correctApproach: "4a and 2a are like terms because they share the same variable 'a'."
                },
                {
                  question: "Combine the like terms (4a + 2a = ?)",
                  correctApproach: "4a + 2a = 6a"
                },
                {
                  question: "Write the final simplified expression",
                  correctApproach: "6a + 6 is the simplified form."
                }
              ]}
              onComplete={() => markSectionComplete("discussion")}
            />
          </div>
        )}
      </LearningSection>

      {/* Practice Problems */}
      <LearningSection
        id="examples"
        title="Practice Problems"
        subtitle="Test your understanding with multiple choice questions"
        variant="highlight"
      >
        {isSectionLocked(5) ? (
          <Card className="p-12 text-center bg-muted/50">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Section Locked</h3>
            <p className="text-muted-foreground mb-4">
              Complete the guided practice to unlock these problems!
            </p>
            <Button 
              onClick={() => markSectionComplete(steps[4].id)}
              className="mt-2"
            >
              Unlock Section (Dev Mode)
            </Button>
          </Card>
        ) : (
          <AssessmentQuiz 
            onComplete={() => markSectionComplete("examples")}
            questions={[
          {
            id: "p1",
            question: "Simplify: 7x + 2x",
            options: ["9x", "9x²", "14x", "7x + 2x"],
            correctAnswer: 0,
            explanation: "When combining like terms, add the coefficients: 7 + 2 = 9, so 7x + 2x = 9x"
          },
          {
            id: "p2",
            question: "In the expression 8y - 3, what is the constant?",
            options: ["8", "y", "-3", "8y"],
            correctAnswer: 2,
            explanation: "The constant is the number without a variable. In this expression, -3 is the constant term."
          },
          {
            id: "p3",
            question: "Which expression represents 'five times a number n, plus seven'?",
            options: ["5 + n + 7", "5n + 7", "5(n + 7)", "n + 5 + 7"],
            correctAnswer: 1,
            explanation: "'Five times a number n' means 5n, and 'plus seven' means +7, giving us 5n + 7"
          },
          {
            id: "p4",
            question: "What is the coefficient in the term -4x?",
            options: ["4", "x", "-4", "-4x"],
            correctAnswer: 2,
            explanation: "The coefficient includes the sign, so in -4x, the coefficient is -4"
          },
          {
            id: "p5",
            question: "Simplify: 3a + 2b + 5a",
            options: ["10ab", "8a + 2b", "10a + 2b", "3a + 7b"],
            correctAnswer: 1,
            explanation: "Combine like terms: 3a + 5a = 8a. The 2b stays separate because it has a different variable: 8a + 2b"
          },
        ]} />
        )}
      </LearningSection>

      {/* Unity Game Activity */}
      <LearningSection
        id="game-activity"
        title="Interactive Activity"
        subtitle="Apply your skills in a fun game environment"
      >
        <Card className="p-8 border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Gamepad2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Unity Game Activity</h3>
            <p className="text-muted-foreground max-w-md">
              An interactive Unity game will be embedded here to help you practice expressions and variables in a fun, gamified way!
            </p>
            <Badge variant="secondary" className="text-sm">Coming Soon</Badge>
          </div>
        </Card>
      </LearningSection>

      {/* Recap */}
      <LearningSection
        id="recap"
        title="Lesson Recap"
        subtitle="Let's review what we've learned"
      >
        <Card className="p-8 shadow-medium">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                Key Vocabulary
              </h3>
              <p className="text-muted-foreground ml-10">
                Variables, expressions, coefficients, and constants work together to represent mathematical relationships.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
                Real-World Connections
              </h3>
              <p className="text-muted-foreground ml-10">
                Algebraic expressions appear in gaming, budgeting, phone plans, and countless other daily scenarios.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">3</span>
                </div>
                Core Skills
              </h3>
              <p className="text-muted-foreground ml-10">
                Combine like terms by adding coefficients. Recognize patterns. Translate word problems into expressions.
              </p>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg mt-6">
              <p className="font-semibold text-lg mb-2">🎯 You're Ready!</p>
              <p className="text-muted-foreground">
                You've learned the fundamentals of expressions and variables. Time to show what you know in the assessment!
              </p>
            </div>
          </div>
        </Card>
      </LearningSection>

      {/* Assessment */}
      <LearningSection
        id="assessment"
        title="Knowledge Check"
        subtitle="Test your understanding of expressions and variables"
        variant="highlight"
      >
        {isSectionLocked(7) ? (
          <Card className="p-12 text-center bg-muted/50">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Assessment Locked</h3>
            <p className="text-muted-foreground mb-4">
              Complete all previous sections to unlock the final assessment!
            </p>
            <Button 
              onClick={() => markSectionComplete(steps[6].id)}
              className="mt-2"
            >
              Unlock Section (Dev Mode)
            </Button>
          </Card>
        ) : (
          <AssessmentQuiz 
            questions={quizQuestions}
            onComplete={() => markSectionComplete("assessment")} 
          />
        )}
      </LearningSection>

      {/* Footer */}
      <div className="bg-card border-t border-border py-8 mb-20">
        <div className="container max-w-5xl mx-auto px-4 text-center text-muted-foreground">
          <p>Great work on completing this lesson! 🎉</p>
        </div>
      </div>

      <BottomChat />
    </div>
  );
};

export default Index;
