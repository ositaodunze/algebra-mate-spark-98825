import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { EmbeddedCalculator } from "@/components/EmbeddedCalculator";
import { EmbeddedScratchPad } from "@/components/EmbeddedScratchPad";

interface DiscussionQuestionsProps {
  onComplete?: () => void;
}

export const DiscussionQuestions = ({ onComplete }: DiscussionQuestionsProps) => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm here to help you with any questions about algebraic expressions. Feel free to ask me anything - whether it's about variables, coefficients, combining like terms, or anything else we've covered!"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    
    // Placeholder AI response - will be connected to backend later
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This is a placeholder response. Once we connect to the AI API, I'll provide helpful, personalized guidance on your question!"
      }]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-6">
          <div className="flex flex-col h-[500px]">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about the topic..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button onClick={onComplete} size="lg">
            Continue to Practice Problems
          </Button>
        </div>
      </div>

      {/* Tools Panel */}
      <div className="space-y-4">
        <EmbeddedCalculator />
        <EmbeddedScratchPad />
      </div>
    </div>
  );
};