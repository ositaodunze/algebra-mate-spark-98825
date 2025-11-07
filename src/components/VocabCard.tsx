import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VocabCardProps {
  term: string;
  definition: string;
  example?: string;
}

export const VocabCard = ({ term, definition, example }: VocabCardProps) => {
  return (
    <Card className="p-5 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-bold text-foreground">{term}</h3>
        <Badge variant="secondary" className="shrink-0">New</Badge>
      </div>
      <p className="text-muted-foreground mb-2">{definition}</p>
      {example && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">Example: </span>
            {example}
          </p>
        </div>
      )}
    </Card>
  );
};
