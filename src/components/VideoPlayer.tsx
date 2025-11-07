import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  title: string;
  description?: string;
}

export const VideoPlayer = ({ title, description }: VideoPlayerProps) => {
  return (
    <Card className="overflow-hidden shadow-medium hover:shadow-glow transition-shadow duration-300">
      <div className="relative bg-gradient-primary aspect-video flex items-center justify-center group cursor-pointer">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-primary fill-primary ml-1" />
          </div>
          <p className="text-white font-semibold text-lg px-4 text-center">
            {title}
          </p>
        </div>
      </div>
      {description && (
        <div className="p-4 bg-card">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
    </Card>
  );
};
