import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, CheckCircle2 } from "lucide-react";

interface DiscussionQuestionProps {
  question: string;
  hint?: string;
}

export const DiscussionQuestion = ({ question, hint }: DiscussionQuestionProps) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card className="p-6 hover:shadow-medium transition-shadow duration-300">
      <div className="flex gap-4">
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <p className="font-semibold text-foreground">{question}</p>
          
          {!submitted ? (
            <>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your thoughts here..."
                className="min-h-24 resize-none"
              />
              {hint && (
                <p className="text-sm text-muted-foreground italic">
                  💡 Hint: {hint}
                </p>
              )}
              <Button
                onClick={() => setSubmitted(true)}
                disabled={!answer.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                Submit Answer
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="font-semibold text-success">Great thinking!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your answer has been recorded. The AI tutor will provide feedback shortly.
                </p>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Your response: {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
