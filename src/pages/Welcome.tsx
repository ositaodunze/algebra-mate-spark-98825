import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Target, Trophy } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Welcome to Math4U
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your personalized journey to mastering mathematics
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border border-border">
              <BookOpen className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Personalized Learning</h3>
              <p className="text-sm text-muted-foreground text-center">
                Tailored content based on your interests and learning style
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border border-border">
              <Target className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">AI-Powered Support</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get help anytime with your personal AI math tutor
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border border-border">
              <Trophy className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground text-center">
                See your growth and celebrate achievements
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/personalization")}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
