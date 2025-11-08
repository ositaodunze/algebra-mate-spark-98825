import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const avatar = localStorage.getItem("userAvatar");
    setUserAvatar(avatar || "");
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/journey-intro')}
          className="gap-2"
        >
          <Home className="w-5 h-5" />
          Home
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/personalization')}
          className="gap-2"
        >
          {userAvatar && (
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-sm">{userAvatar}</AvatarFallback>
            </Avatar>
          )}
          Account
        </Button>
      </div>
    </header>
  );
};
