import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const avatars = [
  { name: "Alex", emoji: "🧑‍🎓", bg: "from-blue-500 to-blue-600" },
  { name: "Sam", emoji: "👨‍💻", bg: "from-green-500 to-green-600" },
  { name: "Jordan", emoji: "👩‍🔬", bg: "from-purple-500 to-purple-600" },
  { name: "Taylor", emoji: "🧑‍🎨", bg: "from-pink-500 to-pink-600" },
  { name: "Casey", emoji: "👨‍🚀", bg: "from-orange-500 to-orange-600" },
  { name: "Riley", emoji: "👩‍🏫", bg: "from-teal-500 to-teal-600" },
  { name: "Morgan", emoji: "🧑‍🔧", bg: "from-red-500 to-red-600" },
  { name: "Avery", emoji: "👨‍🎤", bg: "from-indigo-500 to-indigo-600" },
];

export const Header = () => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState<{ emoji: string; name: string; bg: string } | null>(null);

  useEffect(() => {
    const avatarIndex = localStorage.getItem("userAvatar");
    if (avatarIndex) {
      const index = parseInt(avatarIndex);
      setUserAvatar(avatars[index] || avatars[0]);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Math4You</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate('/journey-intro')}
            className="gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate('/personalization')}
            className="gap-2"
          >
            {userAvatar && (
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${userAvatar.bg} flex items-center justify-center text-sm`}>
                {userAvatar.emoji}
              </div>
            )}
            <span className="hidden sm:inline">Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
