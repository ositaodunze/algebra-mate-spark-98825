import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Algebra Learning</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/personalization')}
          className="gap-2"
        >
          <User className="w-4 h-4" />
          Account
        </Button>
      </div>
    </header>
  );
};
