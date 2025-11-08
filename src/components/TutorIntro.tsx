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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👋</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-primary">Hi! I'm Your AI Tutor</h2>
            <p className="text-muted-foreground max-w-md">
              I'm here to help you throughout your learning journey! I'll provide hints, 
              explanations, and support whenever you need it during your assessment and lessons.
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 w-full space-y-2">
            <p className="font-semibold text-sm">I can help you with:</p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Understanding difficult concepts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Breaking down complex problems
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Providing step-by-step guidance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Answering your questions anytime
              </li>
            </ul>
          </div>

          <Button 
            onClick={onContinue}
            className="bg-primary hover:bg-primary/90 w-full"
            size="lg"
          >
            Let's Get Started!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
