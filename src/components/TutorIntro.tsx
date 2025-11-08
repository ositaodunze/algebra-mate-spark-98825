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
              Hi! I'm {companionName}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              I'm your personal AI math tutor, and I'm excited to be part of your learning journey! 
              Think of me as your always-available study buddy who's here to help you succeed.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
            <div className="bg-card rounded-xl p-4 border border-border text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary text-xl">💡</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Smart Hints</h3>
              <p className="text-xs text-muted-foreground">Get helpful hints without giving away the answer</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Step-by-Step</h3>
              <p className="text-xs text-muted-foreground">Break down complex problems into easy steps</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary text-xl">💬</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Ask Anything</h3>
              <p className="text-xs text-muted-foreground">No question is too small or too big</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-left">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-primary text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">Instant Help</h3>
              <p className="text-xs text-muted-foreground">Available 24/7 whenever you need support</p>
            </div>
          </div>

          <Button 
            onClick={onContinue}
            className="bg-primary hover:bg-primary/90 w-full mt-6"
            size="lg"
          >
            Let's Get Started!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
