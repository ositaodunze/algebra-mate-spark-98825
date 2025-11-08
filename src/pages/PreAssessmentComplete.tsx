import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Sparkles } from "lucide-react";

const PreAssessmentComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full p-12 text-center shadow-glow border-2 border-primary/20 animate-scale-in">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-bounce-gentle">
              <Award className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
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
  );
};

export default PreAssessmentComplete;
