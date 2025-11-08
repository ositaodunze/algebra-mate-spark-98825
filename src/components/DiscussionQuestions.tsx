import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon, Pencil, MessageCircle } from "lucide-react";
import { Calculator } from "@/components/Calculator";
import { ScratchPad } from "@/components/ScratchPad";
import { InlineChat } from "@/components/InlineChat";

interface DiscussionQuestionsProps {
  onComplete?: () => void;
}

export const DiscussionQuestions = ({ onComplete }: DiscussionQuestionsProps) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [scratchPadOpen, setScratchPadOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Discussion & Questions</h3>
            <p className="text-muted-foreground">
              Have questions? Use the chat below to ask our AI assistant anything about algebraic expressions!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => setCalculatorOpen(true)}
            className="gap-2"
          >
            <CalculatorIcon className="w-4 h-4" />
            Calculator
          </Button>
          <Button
            variant="outline"
            onClick={() => setScratchPadOpen(true)}
            className="gap-2"
          >
            <Pencil className="w-4 h-4" />
            Scratch Pad
          </Button>
        </div>

        <InlineChat />
      </Card>

      <div className="text-center">
        <Button onClick={onComplete} size="lg">
          Continue to Practice Problems
        </Button>
      </div>

      <Calculator open={calculatorOpen} onOpenChange={setCalculatorOpen} />
      <ScratchPad open={scratchPadOpen} onOpenChange={setScratchPadOpen} />
    </div>
  );
};