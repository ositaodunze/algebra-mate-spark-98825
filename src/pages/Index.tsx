import { useState, useEffect } from "react";
import { LearningSection } from "@/components/LearningSection";
import { ProgressStepper } from "@/components/ProgressStepper";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LearningStyleTabs } from "@/components/LearningStyleTabs";
import { DiscussionQuestions } from "@/components/DiscussionQuestions";
import { AssessmentQuiz } from "@/components/AssessmentQuiz";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, Target } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
    const element = document.getElementById(steps[index].id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper 
        steps={steps} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Hero Section */}
      <div className="bg-gradient-hero py-16 md:py-24 text-white">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Algebra 1 • Lesson 1
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
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
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {vocabularyTerms.map((vocab, index) => (
              <CarouselItem key={index}>
                <Card className="p-6 hover:shadow-medium transition-all duration-300 border-l-4 border-l-primary">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold text-foreground">{vocab.term}</h3>
                    <Badge variant="secondary" className="shrink-0">New</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{vocab.definition}</p>
                  {vocab.example && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold text-primary">Example: </span>
                        {vocab.example}
                      </p>
                    </div>
                  )}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
          <Card className="p-6 border-l-4 border-l-secondary hover:shadow-medium transition-shadow">
            <h3 className="text-lg font-bold mb-2">🎮 Gaming</h3>
            <p className="text-muted-foreground mb-3">
              Game developers use expressions to calculate damage: If a sword does <span className="font-mono bg-muted px-2 py-1 rounded">10 + 3x</span> damage where x is your level, how much damage at level 5?
            </p>
            <p className="text-sm text-primary font-semibold">
              Answer: 10 + 3(5) = 25 damage
            </p>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent hover:shadow-medium transition-shadow">
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

      {/* Discussion Questions */}
      <LearningSection
        id="discussion"
        title="Discussion Questions"
        subtitle="Think deeply about these concepts with our AI tutor"
      >
        <DiscussionQuestions
          questions={[
            {
              question: "Why do we use letters like 'x' and 'y' instead of just using numbers?",
              hint: "Think about situations where you don't know the exact value yet"
            },
            {
              question: "Can you create your own expression to represent buying multiple items at a store?",
              hint: "Consider: What changes? What stays the same?"
            },
            {
              question: "How is '3x' different from 'x3' or 'x + x + x'? Are they the same or different?",
              hint: "Think about what each notation means mathematically"
            }
          ]}
        />
        <AIAssistant
          sectionTitle="Discussion Time"
          helpText="These questions don't have one 'right' answer - they're about exploring ideas! Your thinking process matters more than being perfect. Share your thoughts and I'll help guide you."
        />
      </LearningSection>

      {/* Example Problems */}
      <LearningSection
        id="examples"
        title="Practice Problems"
        subtitle="Adapted to your learning style"
        variant="highlight"
      >
        <LearningStyleTabs
          problem={{
            visual: (
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Problem: Simplify 2x + 3x</h4>
                <div className="bg-visual/10 border-2 border-visual rounded-lg p-6">
                  <p className="text-center mb-4">Visual representation:</p>
                  <div className="flex justify-center gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-12 h-12 bg-visual rounded flex items-center justify-center text-white font-bold">x</div>
                        <div className="w-12 h-12 bg-visual rounded flex items-center justify-center text-white font-bold">x</div>
                      </div>
                      <p className="text-center text-sm font-semibold">2x</p>
                    </div>
                    <div className="flex items-center text-3xl font-bold text-visual">+</div>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-12 h-12 bg-visual rounded flex items-center justify-center text-white font-bold">x</div>
                        <div className="w-12 h-12 bg-visual rounded flex items-center justify-center text-white font-bold">x</div>
                        <div className="w-12 h-12 bg-visual rounded flex items-center justify-center text-white font-bold">x</div>
                      </div>
                      <p className="text-center text-sm font-semibold">3x</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="mb-2">Count all the x's:</p>
                    <div className="flex justify-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-12 h-12 bg-success rounded flex items-center justify-center text-white font-bold">x</div>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-success mt-4">= 5x</p>
                  </div>
                </div>
              </div>
            ),
            verbal: (
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Problem: Simplify 2x + 3x</h4>
                <div className="bg-verbal/10 border-2 border-verbal rounded-lg p-6">
                  <div className="space-y-4">
                    <p>🗣️ <strong>Let's talk through this:</strong></p>
                    <p>"We have 2 of something unknown (that's 2x), and then we're adding 3 more of that same unknown thing (that's 3x)."</p>
                    <p>"If I have 2 apples and you give me 3 more apples, I now have 5 apples total, right?"</p>
                    <p>"The same logic applies here: 2 x's plus 3 x's equals 5 x's."</p>
                    <div className="bg-verbal/20 p-4 rounded-lg">
                      <p className="font-bold">In words:</p>
                      <p>"Two x <span className="text-verbal font-bold">plus</span> three x <span className="text-verbal font-bold">equals</span> five x"</p>
                    </div>
                    <p className="text-2xl font-bold text-success text-center mt-4">Answer: 5x</p>
                  </div>
                </div>
              </div>
            ),
            logical: (
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Problem: Simplify 2x + 3x</h4>
                <div className="bg-logical/10 border-2 border-logical rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded border-2 border-logical/30">
                      <p className="font-semibold mb-2">🧠 Pattern Recognition:</p>
                      <p className="font-mono">2x + 3x</p>
                    </div>
                    
                    <div className="bg-card p-4 rounded border-2 border-logical/30">
                      <p className="font-semibold mb-2">Step 1: Identify like terms</p>
                      <p>Both terms have the variable 'x' → They are <strong>like terms</strong></p>
                    </div>

                    <div className="bg-card p-4 rounded border-2 border-logical/30">
                      <p className="font-semibold mb-2">Step 2: Apply the rule</p>
                      <p className="font-mono">ax + bx = (a + b)x</p>
                      <p className="text-sm text-muted-foreground mt-2">Combine coefficients, keep the variable</p>
                    </div>

                    <div className="bg-card p-4 rounded border-2 border-logical/30">
                      <p className="font-semibold mb-2">Step 3: Calculate</p>
                      <p className="font-mono">2x + 3x = (2 + 3)x = 5x</p>
                    </div>

                    <p className="text-2xl font-bold text-success text-center mt-4">Result: 5x</p>
                  </div>
                </div>
              </div>
            ),
            kinesthetic: (
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Problem: Simplify 2x + 3x</h4>
                <div className="bg-kinesthetic/10 border-2 border-kinesthetic rounded-lg p-6">
                  <p className="mb-4">✋ <strong>Try this interactive approach:</strong></p>
                  
                  <div className="space-y-6">
                    <div className="bg-card p-4 rounded-lg">
                      <p className="font-semibold mb-3">Step 1: Write it out with your finger</p>
                      <div className="bg-background p-6 rounded-lg border-2 border-dashed border-kinesthetic">
                        <p className="text-3xl font-mono text-center">2x + 3x = ___</p>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded-lg">
                      <p className="font-semibold mb-3">Step 2: Use physical objects</p>
                      <p className="text-sm mb-2">Take 5 similar objects (coins, buttons, etc.)</p>
                      <p className="text-sm">• Put 2 in one pile (this is 2x)</p>
                      <p className="text-sm">• Put 3 in another pile (this is 3x)</p>
                      <p className="text-sm">• Combine them: How many total?</p>
                    </div>

                    <div className="bg-card p-4 rounded-lg">
                      <p className="font-semibold mb-3">Step 3: Draw it</p>
                      <p className="text-sm">Sketch 2 boxes, then 3 more boxes next to them. Count all boxes together.</p>
                    </div>

                    <div className="bg-success/20 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">You get: 5x</p>
                      <p className="text-sm mt-2">You physically combined the x's!</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
          }}
        />
        <AIAssistant
          sectionTitle="Practice Problems"
          helpText="Now it's time to apply what you've learned! These problems are tailored to your learning style. Work through them at your own pace - there's no rush!"
        />
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
        <AssessmentQuiz questions={quizQuestions} />
      </LearningSection>

      {/* Footer */}
      <div className="bg-card border-t border-border py-8">
        <div className="container max-w-5xl mx-auto px-4 text-center text-muted-foreground">
          <p>Great work on completing this lesson! 🎉</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
