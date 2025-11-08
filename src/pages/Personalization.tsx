import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Personalization = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const avatars = [
    "👩🏽‍🦱", "👩🏻‍🎤", "👨🏻‍🦱", "👨🏾", 
    "👨🏻‍✈️", "👩🏾‍🦱", "👩🏽‍🎤", "👨🏼"
  ];

  const companions = [
    { name: "Professor Wise", emoji: "🧙‍♂️", description: "Formal and scholarly" },
    { name: "Coach Pat", emoji: "💪", description: "Energetic and motivating" },
    { name: "Buddy", emoji: "😊", description: "Friendly and casual" },
    { name: "Dr. Smart", emoji: "👨‍🔬", description: "Scientific and precise" },
  ];

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
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      // Store all selections in localStorage
      localStorage.setItem("userAvatar", selectedAvatar?.toString() || "0");
      localStorage.setItem("userCompanion", selectedCompanion);
      localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
      navigate("/pre-assessment");
    }
  };

  const canContinue = () => {
    if (currentStep === 1) return selectedAvatar !== null;
    if (currentStep === 2) return selectedCompanion !== "";
    return selectedInterests.length >= 3;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-12 md:py-16 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <Badge className="bg-white/20 text-white border-white/30">
              Step {currentStep} of 3
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {currentStep === 1 && "Choose Your Avatar"}
            {currentStep === 2 && "Choose Your Math Companion"}
            {currentStep === 3 && "Select Your Interests"}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {currentStep === 1 && "Select an avatar that represents you"}
            {currentStep === 2 && "Pick an AI companion to guide your learning journey"}
            {currentStep === 3 && "Tell us about your interests so we can tailor examples and videos to what you love!"}
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8 shadow-medium">
          {/* Step 1: Avatar Selection */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Avatar</h2>
              <p className="text-muted-foreground mb-8 text-center">
                Select an avatar that represents you
              </p>
              <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    className={`
                      flex items-center justify-center cursor-pointer rounded-full
                      transition-all hover:scale-110 p-2
                      ${selectedAvatar === index ? "ring-4 ring-primary bg-primary/10" : "hover:ring-2 hover:ring-primary/50"}
                    `}
                  >
                    <div className="text-6xl">{avatar}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Companion Selection */}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Math Companion</h2>
              <p className="text-muted-foreground mb-8 text-center">
                Your AI companion will guide you through your learning journey
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                {companions.map((companion) => (
                  <div
                    key={companion.name}
                    onClick={() => setSelectedCompanion(companion.name)}
                    className={`
                      flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer
                      transition-all hover:shadow-md
                      ${selectedCompanion === companion.name
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50"}
                    `}
                  >
                    <div className="text-5xl mb-3">{companion.emoji}</div>
                    <h3 className="font-bold text-lg mb-1">{companion.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {companion.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Interest Selection */}
          {currentStep === 3 && (
            <>
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
                      ${selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50"}
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
            </>
          )}

          <div className="flex justify-between items-center pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </Button>
            ) : <div />}
            
            <div className="flex items-center gap-4">
              {currentStep === 3 && (
                <p className="text-sm text-muted-foreground">
                  {selectedInterests.length} selected
                  {selectedInterests.length < 3 && " (select at least 3)"}
                </p>
              )}
              <Button
                onClick={handleContinue}
                disabled={!canContinue()}
                className="bg-primary hover:bg-primary/90"
                size="lg"
              >
                {currentStep === 3 ? "Continue to Assessment" : "Continue"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Personalization;
