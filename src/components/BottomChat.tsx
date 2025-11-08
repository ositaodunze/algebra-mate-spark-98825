import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, MessageCircle, X, Sparkles } from "lucide-react";

export const BottomChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    setIsLoading(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This is a placeholder response. Once we connect to the AI API, I'll provide helpful, personalized guidance on your question!"
      }]);
      setIsLoading(false);
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
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded Chat */}
      {isExpanded && (
        <Card className="mx-auto max-w-4xl mb-4 mx-4 shadow-2xl border-2">
          <div className="flex items-center justify-between p-4 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">AI Math Tutor</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                <div>
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Ask anything about the topic...</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <Card
                    className={`max-w-[80%] p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold">AI Tutor</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </Card>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <Card className="bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about the topic..."
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                size="icon"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Collapsed Input Bar */}
      {!isExpanded && (
        <div className="bg-background border-t shadow-lg">
          <div className="container max-w-4xl mx-auto px-4 py-3">
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(true)}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Ask anything about the topic..."
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer"
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
