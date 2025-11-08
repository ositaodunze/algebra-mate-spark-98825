import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mascot } from "@/components/Mascot";
import { Progress } from "@/components/ui/progress";

const Personalization = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const avatars = [
    { name: "Alex", emoji: "🧑‍🎓", bg: "from-blue-500 to-blue-600" },
    { name: "Sam", emoji: "👨‍💻", bg: "from-green-500 to-green-600" },
    { name: "Jordan", emoji: "👩‍🔬", bg: "from-purple-500 to-purple-600" },
    { name: "Taylor", emoji: "🧑‍🎨", bg: "from-pink-500 to-pink-600" },
    { name: "Casey", emoji: "👨‍🚀", bg: "from-orange-500 to-orange-600" },
    { name: "Riley", emoji: "👩‍🏫", bg: "from-teal-500 to-teal-600" },
    { name: "Morgan", emoji: "🧑‍🔧", bg: "from-red-500 to-red-600" },
    { name: "Avery", emoji: "👨‍🎤", bg: "from-indigo-500 to-indigo-600" },
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

  const stepProgress = (currentStep / 3) * 100;

  const getMascotMessage = () => {
    switch(currentStep) {
      case 1:
        return {
          emoji: "🎭",
          message: (
            <div className="space-y-2">
              <p className="font-bold text-lg">Time to create your character! 🌟</p>
              <p>Pick an avatar that represents YOU. This is how you'll appear throughout your math journey!</p>
            </div>
          )
        };
      case 2:
        return {
          emoji: "🤝",
          message: (
            <div className="space-y-2">
              <p className="font-bold text-lg">Now let's pick your AI study buddy!</p>
              <p>Your companion will guide you, cheer you on, and explain things in their own unique way. Who do you vibe with?</p>
            </div>
          )
        };
      case 3:
        return {
          emoji: "🎨",
          message: (
            <div className="space-y-2">
              <p className="font-bold text-lg">Last step - tell us what you love! ❤️</p>
              <p>We'll use your interests to create math problems about things you actually care about. Way more fun than boring textbook examples!</p>
            </div>
          )
        };
      default:
        return { emoji: "🧙‍♂️", message: "" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="bg-gradient-hero py-8 md:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
              ✨ Step {currentStep} of 3
            </Badge>
            <span className="text-white/90 text-sm font-medium">{Math.round(stepProgress)}% Complete</span>
          </div>
          <Progress value={stepProgress} className="h-3 bg-white/20 mb-6" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center animate-slide-up">
            {currentStep === 1 && "Choose Your Avatar 🎭"}
            {currentStep === 2 && "Pick Your Companion 🤖"}
            {currentStep === 3 && "What Do You Love? 💖"}
          </h1>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Mascot Guidance */}
        <div className="mb-8">
          <Mascot 
            emoji={getMascotMessage().emoji}
            position="left"
            variant="primary"
            message={getMascotMessage().message}
          />
        </div>

        <Card className="p-6 md:p-10 shadow-medium border-2">
          {/* Step 1: Avatar Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Who are you?</h2>
                <p className="text-muted-foreground">
                  Click on your favorite avatar!
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    className={`
                      flex flex-col items-center gap-3 cursor-pointer rounded-3xl p-6
                      transition-all duration-300 hover:scale-110 border-3 group
                      ${selectedAvatar === index 
                        ? "border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-glow animate-pop" 
                        : "border-border hover:border-primary/50 hover:shadow-soft"}
                    `}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-3xl md:text-4xl shadow-medium group-hover:animate-wiggle`}>
                      {avatar.emoji}
                    </div>
                    <span className="text-sm md:text-base font-bold">{avatar.name}</span>
                    {selectedAvatar === index && (
                      <Badge className="bg-primary text-xs">Selected! ✓</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Companion Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Meet Your AI Tutors!</h2>
                <p className="text-muted-foreground">
                  Each has their own teaching style. Pick your favorite!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                {companions.map((companion) => (
                  <div
                    key={companion.name}
                    onClick={() => setSelectedCompanion(companion.name)}
                    className={`
                      flex flex-col items-center p-8 rounded-3xl border-3 cursor-pointer
                      transition-all duration-300 hover:scale-105 group
                      ${selectedCompanion === companion.name
                        ? "border-secondary bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-purple animate-pop"
                        : "border-border hover:border-secondary/50 hover:shadow-soft"}
                    `}
                  >
                    <div className="text-6xl md:text-7xl mb-4 group-hover:animate-bounce-gentle">{companion.emoji}</div>
                    <h3 className="font-bold text-xl mb-2">{companion.name}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-3">
                      {companion.description}
                    </p>
                    {selectedCompanion === companion.name && (
                      <Badge className="bg-secondary mt-2">Your Tutor! ⭐</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Interest Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">What do you love? 💕</h2>
                <p className="text-muted-foreground">
                  Pick at least 3 things - the more you choose, the better we can personalize your experience!
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {interests.map((interest) => (
                  <div
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`
                      flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-3 cursor-pointer
                      transition-all duration-300 hover:scale-110 group relative
                      ${selectedInterests.includes(interest.id)
                        ? "border-accent bg-gradient-to-br from-accent/20 to-accent/10 shadow-orange"
                        : "border-border hover:border-accent/50 hover:shadow-soft"}
                    `}
                  >
                    <div className="text-3xl md:text-4xl mb-2 group-hover:animate-wiggle">{interest.icon}</div>
                    <Label
                      htmlFor={interest.id}
                      className="text-center text-xs md:text-sm font-bold cursor-pointer"
                    >
                      {interest.label}
                    </Label>
                    {selectedInterests.includes(interest.id) && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm animate-pop">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Progress Indicator */}
              {selectedInterests.length > 0 && (
                <div className="text-center animate-slide-up">
                  <Badge 
                    className={`text-sm px-4 py-2 ${
                      selectedInterests.length >= 3 
                        ? "bg-success text-white" 
                        : "bg-muted"
                    }`}
                  >
                    {selectedInterests.length >= 3 ? "🎉 Awesome! " : ""}
                    {selectedInterests.length} selected
                    {selectedInterests.length < 3 && ` - ${3 - selectedInterests.length} more to go!`}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-8 mt-8 border-t-2 border-border">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                size="lg"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : <div />}
            
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              size="lg"
              variant={currentStep === 3 ? "fun" : "default"}
              className="gap-2 min-w-[180px]"
            >
              {currentStep === 3 ? "🚀 Start Assessment" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Personalization;
