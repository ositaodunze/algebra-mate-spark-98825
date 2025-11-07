import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Eye, Volume2, Brain, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExampleProblem {
  visual: React.ReactNode;
  verbal: React.ReactNode;
  logical: React.ReactNode;
  kinesthetic: React.ReactNode;
}

interface LearningStyleTabsProps {
  problem: ExampleProblem;
}

const styles = [
  {
    id: "visual",
    label: "Visual",
    icon: Eye,
    color: "visual",
    description: "See it with diagrams and colors"
  },
  {
    id: "verbal",
    label: "Verbal",
    icon: Volume2,
    color: "verbal",
    description: "Talk through the logic"
  },
  {
    id: "logical",
    label: "Logical",
    icon: Brain,
    color: "logical",
    description: "Decode the patterns"
  },
  {
    id: "kinesthetic",
    label: "Interactive",
    icon: Hand,
    color: "kinesthetic",
    description: "Hands-on manipulation"
  },
];

export const LearningStyleTabs = ({ problem }: LearningStyleTabsProps) => {
  const [activeTab, setActiveTab] = useState("visual");

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Choose your learning style to see examples adapted to how you think best
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent">
          {styles.map((style) => {
            const Icon = style.icon;
            return (
              <TabsTrigger
                key={style.id}
                value={style.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-300",
                  "data-[state=active]:border-current data-[state=active]:shadow-glow",
                  activeTab === style.id && `text-${style.color} border-${style.color}`
                )}
              >
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{style.label}</div>
                  <div className="text-xs opacity-70 hidden md:block">{style.description}</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6">
          {styles.map((style) => (
            <TabsContent key={style.id} value={style.id} className="mt-0">
              <Card className="p-6 shadow-medium">
                {problem[style.id as keyof ExampleProblem]}
              </Card>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
