import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Rocket, Target, Sparkles, Star } from "lucide-react";

const JourneyIntro = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedInterests = localStorage.getItem("userInterests");
    setInterests(savedInterests ? JSON.parse(savedInterests) : []);
    
    // Award 50 points for completing the assessment
    setPoints(50);
  }, []);

  // Beginner level progress (0-100 points for level 1)
  const progressPercentage = Math.min((points / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-16 md:py-24 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
            <Rocket className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your Learning Journey Begins!
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Based on your assessment, we've created a personalized learning path just for you
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Points Earned */}
          <Card className="p-8 shadow-glow bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">🎉 Assessment Complete!</h2>
                <p className="text-lg text-muted-foreground">Great job! You've earned your first points</p>
              </div>
              <div className="text-center bg-background/80 rounded-2xl p-6 shadow-medium">
                <div className="flex items-center gap-3 justify-center mb-2">
                  <Star className="w-8 h-8 text-accent fill-accent animate-pulse" />
                  <p className="text-5xl font-bold text-primary">{points}</p>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Points Earned</p>
              </div>
            </div>
          </Card>

          {/* Personalized Interests */}
          <Card className="p-8 shadow-medium">
            <h2 className="text-2xl font-bold mb-4">Your Interests</h2>
            <p className="text-muted-foreground mb-4">
              We'll use these to create examples and videos tailored to what you love!
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-sm py-2 px-4">
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Learning Path */}
          <Card className="p-8 shadow-medium bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Starting Point</h2>
                <p className="text-muted-foreground">
                  Regardless of your current level, everyone begins with the fundamentals. 
                  We'll start with <span className="font-semibold text-primary">Expressions & Variables</span> - 
                  the building blocks of algebra that everything else builds upon.
                </p>
              </div>
            </div>

            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-primary">Lesson 1</Badge>
                <h3 className="font-bold text-lg">Expressions & Variables</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Master the fundamentals of algebraic thinking with personalized examples based on your interests.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  Understand variables and their role in algebra
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  Create and simplify algebraic expressions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  Apply concepts to real-world scenarios you care about
                </li>
              </ul>
            </div>
          </Card>

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/lesson")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              Start Learning: Expressions & Variables
              <Rocket className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              After mastering this lesson, we'll guide you to the next topic based on your assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyIntro;
