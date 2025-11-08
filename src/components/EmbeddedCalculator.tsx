import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const EmbeddedCalculator = () => {
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
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Calculator</h3>
      <div className="space-y-3">
        <div className="bg-muted p-3 rounded-lg text-right text-xl font-mono min-h-[50px] flex items-center justify-end">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="destructive" size="sm" onClick={handleClear}>C</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("(")}>(</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber(")")}>)</Button>
          <Button variant="secondary" size="sm" onClick={() => handleOperator("÷")}>÷</Button>
          
          <Button variant="outline" size="sm" onClick={() => handleNumber("7")}>7</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("8")}>8</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("9")}>9</Button>
          <Button variant="secondary" size="sm" onClick={() => handleOperator("×")}>×</Button>
          
          <Button variant="outline" size="sm" onClick={() => handleNumber("4")}>4</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("5")}>5</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("6")}>6</Button>
          <Button variant="secondary" size="sm" onClick={() => handleOperator("-")}>-</Button>
          
          <Button variant="outline" size="sm" onClick={() => handleNumber("1")}>1</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("2")}>2</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("3")}>3</Button>
          <Button variant="secondary" size="sm" onClick={() => handleOperator("+")}>+</Button>
          
          <Button variant="outline" size="sm" onClick={() => handleNumber("±")}>±</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber("0")}>0</Button>
          <Button variant="outline" size="sm" onClick={() => handleNumber(".")}>.</Button>
          <Button size="sm" className="bg-success hover:bg-success/90" onClick={handleEquals}>=</Button>
        </div>
      </div>
    </Card>
  );
};
