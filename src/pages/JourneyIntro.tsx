import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { Mascot } from "@/components/Mascot";

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
      <div className="bg-gradient-hero py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">⭐</div>
          <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🎯</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-float" style={{ animationDelay: '1s' }}>🚀</div>
        </div>
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 mb-6 animate-bounce-gentle">
            <Trophy className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            You're Officially a Math4You Student! 🎉
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Assessment complete! Time to start your personalized learning adventure
          </p>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-8">
          
          {/* Mascot Celebration */}
          <Mascot 
            emoji="🎊"
            position="center"
            variant="success"
            message={
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold">Woohoo! You crushed it! 🌟</p>
                <p className="text-lg">
                  You've earned your first <span className="font-bold text-accent">{points} points</span> just for completing the assessment!
                  Keep learning to level up and unlock awesome achievements.
                </p>
              </div>
            }
          />
          {/* Points Display Card */}
          <Card className="p-8 md:p-10 shadow-glow bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 border-3 border-accent/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🏆</div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3 justify-center md:justify-start">
                  <Zap className="w-8 h-8 text-accent animate-pulse" />
                  Points Earned!
                </h2>
                <p className="text-lg text-muted-foreground">
                  You're officially on the path to math mastery! 🚀
                </p>
              </div>
              <div className="text-center bg-background/90 backdrop-blur-sm rounded-3xl p-8 shadow-medium border-2 border-accent/20 min-w-[200px]">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <Star className="w-10 h-10 text-accent fill-accent animate-pulse" />
                  <p className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">{points}</p>
                </div>
                <p className="text-sm font-bold text-accent uppercase tracking-wider">Points</p>
                <Badge className="mt-3 bg-success">Beginner Level</Badge>
              </div>
            </div>
          </Card>

          {/* Mascot explaining personalization */}
          <Mascot 
            emoji="🎯"
            position="right"
            variant="primary"
            message={
              <div className="space-y-3">
                <p className="font-bold text-lg">Here's what makes YOUR path special!</p>
                <p>
                  We noticed you're into <span className="font-semibold text-primary">
                  {interests.slice(0, 2).map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}</span>
                  {interests.length > 2 && ` and more`}! 
                  So we'll use examples about those things when teaching math. Way cooler than "Train A leaves the station..." right? 😎
                </p>
              </div>
            }
          />

          {/* First Lesson Card */}
          <Card className="p-8 md:p-10 shadow-medium bg-gradient-to-br from-primary/5 to-secondary/5 border-3 border-primary/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-medium">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <Badge className="bg-primary mb-3 text-sm px-4 py-1">📚 Lesson 1</Badge>
                <h2 className="text-3xl font-bold mb-2">Expressions & Variables</h2>
                <p className="text-muted-foreground">
                  Everyone starts here - it's the foundation everything else builds on! Don't worry, we'll make it fun! 🎮
                </p>
              </div>
            </div>

            <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-border">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold">What variables actually are</p>
                    <p className="text-sm text-muted-foreground">Spoiler: They're way easier than you think!</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold">Create and simplify expressions</p>
                    <p className="text-sm text-muted-foreground">With examples from YOUR interests</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold">Use them in real scenarios</p>
                    <p className="text-sm text-muted-foreground">See how math connects to your world</p>
                  </div>
                </li>
              </ul>
            </div>
          </Card>

          {/* Final encouragement */}
          <Mascot 
            emoji="🚀"
            position="left"
            variant="accent"
            message={
              <div className="space-y-2">
                <p className="font-bold text-xl">Ready to become a math superhero? 💪</p>
                <p>
                  Click that button below and let's start your first lesson! Remember, I'm here to help whenever you need me. 
                  You've got this! 🌟
                </p>
              </div>
            }
          />

          {/* Action Button */}
          <div className="text-center py-6">
            <Button
              onClick={() => navigate("/lesson")}
              size="lg"
              variant="fun"
              className="text-xl px-12 py-8 h-auto shadow-glow hover:shadow-purple transition-all duration-300 hover:scale-110 gap-3"
            >
              🎯 Start Your First Lesson!
              <Rocket className="w-6 h-6" />
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Takes about 15-20 minutes • Earn more points as you go! ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyIntro;
