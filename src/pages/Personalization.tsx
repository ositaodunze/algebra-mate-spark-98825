import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const Personalization = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "gaming", label: "Gaming", icon: "🎮" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "art", label: "Art & Design", icon: "🎨" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "cooking", label: "Cooking", icon: "🍳" },
    { id: "reading", label: "Reading", icon: "📚" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "movies", label: "Movies & TV", icon: "🎬" },
    { id: "fitness", label: "Fitness", icon: "💪" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "science", label: "Science", icon: "🔬" },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    // Store interests in localStorage for later use
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    navigate("/pre-assessment");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-12 md:py-16 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <Badge className="bg-white/20 text-white border-white/30">
              Step 1 of 2
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Personalize Your Learning
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Tell us about your interests so we can tailor examples and videos to what you love!
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8 shadow-medium">
          <h2 className="text-2xl font-bold mb-6">What are you interested in?</h2>
          <p className="text-muted-foreground mb-8">
            Select at least 3 interests to help us create personalized learning experiences.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {interests.map((interest) => (
              <div
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer
                  transition-all hover:shadow-md
                  ${
                    selectedInterests.includes(interest.id)
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                <div className="text-4xl mb-3">{interest.icon}</div>
                <Label
                  htmlFor={interest.id}
                  className="text-center font-medium cursor-pointer"
                >
                  {interest.label}
                </Label>
                <Checkbox
                  id={interest.id}
                  checked={selectedInterests.includes(interest.id)}
                  className="mt-3"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {selectedInterests.length} selected
              {selectedInterests.length < 3 && " (select at least 3)"}
            </p>
            <Button
              onClick={handleContinue}
              disabled={selectedInterests.length < 3}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              Continue to Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Personalization;
