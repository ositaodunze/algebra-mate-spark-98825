import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Calculator = ({ open, onOpenChange }: CalculatorProps) => {
  const [display, setDisplay] = useState("0");

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === "0" ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(prev => prev + " " + op + " ");
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleEquals = () => {
    try {
      const result = eval(display.replace(/×/g, "*").replace(/÷/g, "/"));
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Calculator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="destructive" onClick={handleClear} className="col-span-1">C</Button>
            <Button variant="outline" onClick={() => handleNumber("(")}>(</Button>
            <Button variant="outline" onClick={() => handleNumber(")")}>)</Button>
            <Button variant="secondary" onClick={() => handleOperator("÷")}>÷</Button>
            
            <Button variant="outline" onClick={() => handleNumber("7")}>7</Button>
            <Button variant="outline" onClick={() => handleNumber("8")}>8</Button>
            <Button variant="outline" onClick={() => handleNumber("9")}>9</Button>
            <Button variant="secondary" onClick={() => handleOperator("×")}>×</Button>
            
            <Button variant="outline" onClick={() => handleNumber("4")}>4</Button>
            <Button variant="outline" onClick={() => handleNumber("5")}>5</Button>
            <Button variant="outline" onClick={() => handleNumber("6")}>6</Button>
            <Button variant="secondary" onClick={() => handleOperator("-")}>-</Button>
            
            <Button variant="outline" onClick={() => handleNumber("1")}>1</Button>
            <Button variant="outline" onClick={() => handleNumber("2")}>2</Button>
            <Button variant="outline" onClick={() => handleNumber("3")}>3</Button>
            <Button variant="secondary" onClick={() => handleOperator("+")}>+</Button>
            
            <Button variant="outline" onClick={() => handleNumber("±")}>±</Button>
            <Button variant="outline" onClick={() => handleNumber("0")}>0</Button>
            <Button variant="outline" onClick={() => handleNumber(".")}>.</Button>
            <Button className="bg-success hover:bg-success/90" onClick={handleEquals}>=</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
