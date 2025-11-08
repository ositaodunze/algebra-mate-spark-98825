import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TutorIntroProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export const TutorIntro = ({ open, onOpenChange, onContinue }: TutorIntroProps) => {
  const companionName = localStorage.getItem("userCompanion") || "Your AI Tutor";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <div className="flex flex-col items-center text-center space-y-6 py-8 px-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-xl">
              <Bot className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full flex items-center justify-center border-4 border-background shadow-lg">
              <span className="text-white text-2xl">👋</span>
            </div>
          </div>
          
          {/* Greeting */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Hey! I'm Professor Wise 🎓
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              I'm your personal AI tutor, and I'm super excited to be part of your math adventure! 
              Think of me as your always-available friend who's here to help you become a math superstar.
            </p>
          </div>

          {/* Important Message */}
          <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl p-6 border-2 border-accent/40 max-w-lg">
            <p className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              🎮 Let's Start with a Fun Challenge!
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              We're going to begin with a quick <span className="font-bold text-primary">pre-assessment</span>! 
              Don't worry - this isn't a test you can fail. It's actually a fun way for me to get to know what you already know, 
              so I can create the perfect learning adventure just for you! 
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed mt-3">
              Remember: It's totally okay if you don't know some answers - that's what we're here to learn together! 🌟
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
            <div className="bg-card rounded-xl p-4 border-2 border-primary/20 text-left hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Smart Hints</h3>
              <p className="text-xs text-muted-foreground">Get helpful clues when you're stuck</p>
            </div>
            <div className="bg-card rounded-xl p-4 border-2 border-success/20 text-left hover:border-success/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-2">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Step-by-Step</h3>
              <p className="text-xs text-muted-foreground">Break down tricky problems together</p>
            </div>
            <div className="bg-card rounded-xl p-4 border-2 border-secondary/20 text-left hover:border-secondary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-2">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Ask Anything</h3>
              <p className="text-xs text-muted-foreground">No question is too silly or small</p>
            </div>
            <div className="bg-card rounded-xl p-4 border-2 border-accent/20 text-left hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-2">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Always Here</h3>
              <p className="text-xs text-muted-foreground">Available 24/7 when you need me</p>
            </div>
          </div>

          <Button 
            onClick={onContinue}
            className="bg-primary hover:bg-primary/90 w-full mt-6"
            size="lg"
          >
            Let's Begin the Pre-Assessment!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
