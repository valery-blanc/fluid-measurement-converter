import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ConversionCard = () => {
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [cm, setCm] = useState<string>("");

  // Conversion feet + inches -> cm
  const updateCmFromFeetInches = (feetVal: number, inchesVal: number) => {
    const totalInches = feetVal * 12 + inchesVal;
    const cmValue = totalInches * 2.54;
    setCm(cmValue.toFixed(2));
  };

  // Conversion cm -> feet + inches
  const updateFeetInchesFromCm = (cmVal: number) => {
    const totalInches = cmVal / 2.54;
    const feetVal = Math.floor(totalInches / 12);
    const inchesVal = totalInches % 12;
    setFeet(feetVal.toString());
    setInches(inchesVal.toFixed(2));
  };

  const handleFeetChange = (value: string) => {
    setFeet(value);
    const feetNum = parseFloat(value) || 0;
    const inchesNum = parseFloat(inches) || 0;
    updateCmFromFeetInches(feetNum, inchesNum);
  };

  const handleInchesChange = (value: string) => {
    setInches(value);
    const feetNum = parseFloat(feet) || 0;
    const inchesNum = parseFloat(value) || 0;
    updateCmFromFeetInches(feetNum, inchesNum);
  };

  const handleCmChange = (value: string) => {
    setCm(value);
    const cmNum = parseFloat(value) || 0;
    updateFeetInchesFromCm(cmNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Feet & Inches Section */}
        <div className="space-y-4 p-3 bg-secondary/30 rounded-xl">
          <div className="space-y-2">
            <Label htmlFor="feet" className="text-base font-semibold text-secondary-foreground">
              Feet (pieds)
            </Label>
            <Input
              id="feet"
              type="number"
              value={feet}
              onChange={(e) => handleFeetChange(e.target.value)}
              placeholder="0"
              className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
              min="0"
              step="any"
              autoFocus
              inputMode="numeric"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inches" className="text-base font-semibold text-secondary-foreground">
              Inches (pouces)
            </Label>
            <Input
              id="inches"
              type="number"
              value={inches}
              onChange={(e) => handleInchesChange(e.target.value)}
              placeholder="0"
              className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
              min="0"
              step="any"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Centimeters Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="cm" className="text-base font-semibold text-secondary-foreground">
            Centimètres (cm)
          </Label>
          <Input
            id="cm"
            type="number"
            value={cm}
            onChange={(e) => handleCmChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>1 pied = 30.48 cm • 1 pouce = 2.54 cm</p>
        </div>
        
        <Button 
          onClick={() => {
            setFeet("");
            setInches("");
            setCm("");
          }}
          variant="outline"
          className="w-full"
        >
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default ConversionCard;
