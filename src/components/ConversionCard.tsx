import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ConversionCard = () => {
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [cm, setCm] = useState<string>("");
  const [yards, setYards] = useState<string>("");

  // Conversion feet + inches -> cm and yards
  const updateFromFeetInches = (feetVal: number, inchesVal: number) => {
    const totalInches = feetVal * 12 + inchesVal;
    const cmValue = totalInches * 2.54;
    const yardsValue = totalInches / 36;
    setCm(cmValue.toFixed(5));
    setYards(yardsValue.toFixed(5));
  };

  // Conversion cm -> feet, inches, yards
  const updateFromCm = (cmVal: number) => {
    const totalInches = cmVal / 2.54;
    const feetVal = Math.floor(totalInches / 12);
    const inchesVal = totalInches % 12;
    const yardsValue = totalInches / 36;
    setFeet(feetVal.toString());
    setInches(inchesVal.toFixed(5));
    setYards(yardsValue.toFixed(5));
  };

  // Conversion yards -> feet, inches, cm
  const updateFromYards = (yardsVal: number) => {
    const totalInches = yardsVal * 36;
    const feetVal = Math.floor(totalInches / 12);
    const inchesVal = totalInches % 12;
    const cmValue = totalInches * 2.54;
    setFeet(feetVal.toString());
    setInches(inchesVal.toFixed(5));
    setCm(cmValue.toFixed(5));
  };

  const handleFeetChange = (value: string) => {
    setFeet(value);
    const feetNum = parseFloat(value) || 0;
    const inchesNum = parseFloat(inches) || 0;
    updateFromFeetInches(feetNum, inchesNum);
  };

  const handleInchesChange = (value: string) => {
    setInches(value);
    const feetNum = parseFloat(feet) || 0;
    const inchesNum = parseFloat(value) || 0;
    updateFromFeetInches(feetNum, inchesNum);
  };

  const handleCmChange = (value: string) => {
    setCm(value);
    const cmNum = parseFloat(value) || 0;
    updateFromCm(cmNum);
  };

  const handleYardsChange = (value: string) => {
    setYards(value);
    const yardsNum = parseFloat(value) || 0;
    updateFromYards(yardsNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Feet & Inches Section - Same Line */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label className="text-base font-semibold text-secondary-foreground">
            Feet + Inches
          </Label>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="feet" className="text-xs text-muted-foreground">
                Feet
              </Label>
              <Input
                id="feet"
                type="number"
                value={feet}
                onChange={(e) => handleFeetChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="any"
                autoFocus
                inputMode="numeric"
              />
            </div>
            <div className="flex items-end justify-center pb-2">
              <span className="text-xl font-bold text-muted-foreground">+</span>
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="inches" className="text-xs text-muted-foreground">
                Inches
              </Label>
              <Input
                id="inches"
                type="number"
                value={inches}
                onChange={(e) => handleInchesChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="any"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {/* Centimeters Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="cm" className="text-base font-semibold text-secondary-foreground">
            Centimeters (cm)
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

        {/* Yards Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="yards" className="text-base font-semibold text-secondary-foreground">
            Yards (yd)
          </Label>
          <Input
            id="yards"
            type="number"
            value={yards}
            onChange={(e) => handleYardsChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>1 ft = 30.48 cm • 1 in = 2.54 cm • 1 yd = 91.44 cm</p>
        </div>
        
        <Button 
          onClick={() => {
            setFeet("");
            setInches("");
            setCm("");
            setYards("");
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
