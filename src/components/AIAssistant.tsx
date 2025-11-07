import { useState } from "react";
import { Bot, X, Minimize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  sectionTitle: string;
  helpText: string;
}

export const AIAssistant = ({ sectionTitle, helpText }: AIAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-0 right-8 z-40 transition-all duration-300">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <Bot className="w-8 h-8 text-primary-foreground" />
        </button>
      ) : (
        <Card className="w-80 mb-0 shadow-xl border-2 border-primary/20 animate-scale-in">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">AI Tutor</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm font-semibold text-primary">{sectionTitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {helpText}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};