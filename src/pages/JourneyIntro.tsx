import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Shield, Trophy, Target, Lock, BookOpen, Brain, Zap, Award, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import expressionsImage from "@/assets/journey-expressions.png";
import expressionsGradient from "@/assets/expressions-gradient.png";

const JourneyIntro = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [streak, setStreak] = useState(2);
  const [totalXP, setTotalXP] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const savedInterests = localStorage.getItem("userInterests");
    setInterests(savedInterests ? JSON.parse(savedInterests) : []);
    
    // Get username from localStorage or use default
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
    
    // Award initial XP for completing assessment
    setTotalXP(50);
  }, []);

  // Get real-world application examples based on user interests
  const getRealWorldExamples = () => {
    const examples: { title: string; emoji: string; description: string }[] = [];
    
    if (interests.includes("gaming")) {
      examples.push({
        emoji: "🎮",
        title: "Gaming",
        description: "Calculate game scores, level progression, and damage formulas using expressions!"
      });
    }
    if (interests.includes("sports")) {
      examples.push({
        emoji: "⚽",
        title: "Sports",
        description: "Track player stats, fantasy points, and performance metrics with algebra!"
      });
    }
    if (interests.includes("music")) {
      examples.push({
        emoji: "🎵",
        title: "Music",
        description: "Calculate streaming royalties, ticket sales, and playlist analytics!"
      });
    }
    if (interests.includes("technology")) {
      examples.push({
        emoji: "💻",
        title: "Technology",
        description: "Understand server costs, data storage, and algorithm efficiency!"
      });
    }
    if (interests.includes("cooking")) {
      examples.push({
        emoji: "🍳",
        title: "Cooking",
        description: "Scale recipes, calculate nutritional values, and plan meal costs!"
      });
    }
    if (interests.includes("fitness")) {
      examples.push({
        emoji: "💪",
        title: "Fitness",
        description: "Track calories burned, workout intensity, and progress goals!"
      });
    }

    // Default examples if no interests or not enough
    if (examples.length === 0) {
      examples.push(
        {
          emoji: "💰",
          title: "Money Management",
          description: "Calculate earnings, budgets, and savings with algebraic expressions!"
        },
        {
          emoji: "📱",
          title: "Phone Plans",
          description: "Compare costs and find the best deals using math!"
        }
      );
    }

    return examples.slice(0, 3); // Show max 3 examples
  };

  const realWorldExamples = getRealWorldExamples();

  // Days of week for streak display
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [false, false, false, false, true, true, false]; // F, S completed

  // Lessons roadmap
  const lessons = [
    { id: 1, title: "Expressions & Variables", icon: "📊", level: 1, locked: false, current: true },
    { id: 2, title: "Solving Equations", icon: "⚖️", level: 2, locked: true },
    { id: 3, title: "Linear Functions", icon: "📈", level: 3, locked: true },
    { id: 4, title: "Systems of Equations", icon: "🔢", level: 4, locked: true },
    { id: 5, title: "Quadratic Functions", icon: "🎯", level: 5, locked: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Ready to level up your math skills?</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - Gamification Stats */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Streak Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  {streak} <Flame className="w-6 h-6 text-orange-500" />
                </h3>
                <span className="text-sm text-muted-foreground">day streak</span>
              </div>
              <div className="flex justify-between gap-2">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedDays[index] 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Flame className={`w-4 h-4 ${completedDays[index] ? 'text-primary-foreground' : 'opacity-30'}`} />
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* XP Progress Card */}
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-8 h-8 text-muted-foreground" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">UNLOCK NEXT BADGE</h3>
                  <p className="text-2xl font-bold">{totalXP} of 175 XP</p>
                </div>
              </div>
              <Progress value={(totalXP / 175) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Complete lessons to earn your next badge!
              </p>
            </Card>

            {/* Badges Card */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Your Badges
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Trophy className="w-8 h-8 text-accent" />
                  <span className="text-xs text-center font-medium">Started</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 opacity-50">
                  <Zap className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-center">Quick Learner</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 opacity-50">
                  <Brain className="w-8 h-8 text-muted-foreground" />
                  <span className="text-xs text-center">Problem Solver</span>
                </div>
              </div>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <span className="text-sm font-bold w-6">🥇</span>
                  <span className="text-sm flex-1">Alex</span>
                  <span className="text-sm font-bold text-primary">450 XP</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <span className="text-sm font-bold w-6">🥈</span>
                  <span className="text-sm flex-1">Jordan</span>
                  <span className="text-sm font-bold">380 XP</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <span className="text-sm font-bold w-6">🥉</span>
                  <span className="text-sm flex-1">Sam</span>
                  <span className="text-sm font-bold">320 XP</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg border-2 border-primary">
                  <span className="text-sm font-bold w-6">12</span>
                  <span className="text-sm flex-1">{userName}</span>
                  <span className="text-sm font-bold text-primary">{totalXP} XP</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Current Lesson */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Current Lesson Card */}
            <Card className="p-8">
              <div className="text-center mb-6">
                <Badge className="bg-primary mb-3">LEVEL 1</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Expressions & Variables</h2>
                <p className="text-muted-foreground">
                  Master the basics and build a strong foundation
                </p>
              </div>

              {/* Lesson Illustration */}
              <div className="flex justify-center my-8">
                <img 
                  src={expressionsImage} 
                  alt="Algebraic expressions and variables" 
                  className="w-full max-w-2xl rounded-2xl shadow-lg"
                />
              </div>

              {/* Real-World Examples Preview */}
              {realWorldExamples.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    You'll See Examples About
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {realWorldExamples.map((example, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <span className="text-2xl">{example.emoji}</span>
                        <span className="text-sm font-semibold">{example.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Button */}
              <Button
                onClick={() => navigate("/lesson")}
                size="lg"
                className="w-full text-lg py-6 shadow-glow hover:shadow-medium transition-all"
              >
                Start
              </Button>
            </Card>

            {/* Learning Path Roadmap */}
            <Card className="p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Your Learning Path
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                      lesson.current
                        ? 'border-primary bg-primary/10'
                        : lesson.locked
                        ? 'border-border bg-muted/30 opacity-60'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    {lesson.locked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    {lesson.level === 1 ? (
                      <img 
                        src={expressionsGradient} 
                        alt="Expressions" 
                        className="w-16 h-16 mx-auto mb-2 object-contain"
                      />
                    ) : (
                      <div className="text-4xl mb-2">{lesson.icon}</div>
                    )}
                    <div className="text-xs font-bold mb-1">LEVEL {lesson.level}</div>
                    <div className="text-xs font-semibold">{lesson.title}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyIntro;
