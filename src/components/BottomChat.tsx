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

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a placeholder response. Once we connect to the AI API, I'll provide helpful, personalized guidance on your question!",
        },
      ]);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-2">
      {/* Expanded Chat */}
      {isExpanded && (
        <Card className="mx-auto max-w-md shadow-2xl border-2 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">AI Math Tutor</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              <X className="w-3 h-3" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-32 overflow-y-auto p-2 space-y-2">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-center">
                <div>
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Ask anything about the topic...</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <Card
                    className={`max-w-[80%] p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
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
          <div className="p-2 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about the topic..."
                disabled={isLoading}
                className="text-sm"
              />
              <Button onClick={handleSend} size="sm" disabled={!input.trim() || isLoading}>
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Collapsed Input Bar */}
      {!isExpanded && (
        <div className="bg-background border-t shadow-lg rounded-t-2xl">
          <div className="container max-w-lg mx-auto px-3 py-2">
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
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
