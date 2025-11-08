import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Rocket, Star, Zap } from "lucide-react";
import { Mascot } from "@/components/Mascot";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          
          {/* Hero Section with Mascot */}
          <div className="text-center space-y-6 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-primary shadow-glow animate-bounce-gentle mb-4">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-slide-up">
              Welcome to Math4You! 🎉
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Math learning that's actually fun and made just for YOU!
            </p>
          </div>

          {/* Mascot Introduction */}
          <div className="py-4">
            <Mascot 
              emoji="🧙‍♂️"
              position="left"
              variant="primary"
              message={
                <div className="space-y-2">
                  <p className="font-bold text-lg">Hey there, future math genius! 👋</p>
                  <p>
                    I'm <span className="font-semibold text-primary">Professor Wise</span>, and I'll be your guide on this awesome math adventure! 
                    We're going to make algebra so fun, you won't even realize you're learning. Ready to get started?
                  </p>
                </div>
              }
            />
          </div>

          {/* Fun Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="p-6 border-2 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">🎮 Learn Your Way</h3>
              <p className="text-sm text-muted-foreground">
                Choose your avatar, pick your learning style, and we'll customize everything just for you!
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-secondary transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-secondary/5 to-secondary/10">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">⭐ Earn Points</h3>
              <p className="text-sm text-muted-foreground">
                Complete lessons, solve problems, and watch your points grow. Level up and unlock achievements!
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-accent transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-accent/5 to-accent/10">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">🤖 AI Helper</h3>
              <p className="text-sm text-muted-foreground">
                Stuck? Your AI tutor is always ready to help explain things in a way that makes sense!
              </p>
            </Card>
          </div>

          {/* Another Mascot Message */}
          <div className="py-4">
            <Mascot 
              emoji="🚀"
              position="right"
              variant="accent"
              message={
                <div className="space-y-2">
                  <p className="font-bold text-lg">What makes Math4You special?</p>
                  <p>
                    We use examples from things YOU love - whether it's sports, gaming, music, or anything else! 
                    Math is everywhere, and we'll show you how it connects to your world. 🌟
                  </p>
                </div>
              }
            />
          </div>

          {/* CTA Section */}
          <div className="text-center pt-4 pb-8">
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => navigate("/personalization")}
                className="text-lg px-12 py-7 h-auto shadow-glow hover:shadow-purple transition-all duration-300 hover:scale-105 animate-wiggle"
                variant="fun"
              >
                🎯 Let's Start Your Journey!
              </Button>
              <p className="text-sm text-muted-foreground">
                It only takes 2 minutes to personalize your experience
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
